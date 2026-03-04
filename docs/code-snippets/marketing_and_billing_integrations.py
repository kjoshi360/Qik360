"""Reference Python snippets for WhatsApp, Meta Ads, CRM RBAC, and Cashfree integrations."""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import time
from dataclasses import dataclass
from typing import Any, Iterable

import requests

logger = logging.getLogger(__name__)


# -------------------------
# WhatsApp Business API
# -------------------------

def send_whatsapp_template_message(
    *,
    access_token: str,
    phone_number_id: str,
    recipient_phone_number: str,
    template_id: str,
    language_code: str,
    template_variables: list[str],
    api_version: str = "v21.0",
    timeout_s: int = 20,
) -> dict[str, Any]:
    """Send a single WhatsApp template message and return API response data."""

    url = f"https://graph.facebook.com/{api_version}/{phone_number_id}/messages"
    payload = {
        "messaging_product": "whatsapp",
        "to": recipient_phone_number,
        "type": "template",
        "template": {
            "name": template_id,
            "language": {"code": language_code},
            "components": [
                {
                    "type": "body",
                    "parameters": [{"type": "text", "text": value} for value in template_variables],
                }
            ],
        },
    }
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    response = requests.post(url, headers=headers, json=payload, timeout=timeout_s)
    response.raise_for_status()
    data = response.json()

    message_id = None
    if isinstance(data.get("messages"), list) and data["messages"]:
        message_id = data["messages"][0].get("id")

    return {
        "status_code": response.status_code,
        "message_id": message_id,
        "raw": data,
    }


def is_opted_in(recipient_phone_number: str, opted_in_store: set[str] | dict[str, bool]) -> bool:
    """Check whether the recipient has explicit opt-in before marketing sends."""

    if isinstance(opted_in_store, set):
        return recipient_phone_number in opted_in_store
    return bool(opted_in_store.get(recipient_phone_number))


def send_bulk_whatsapp_templates(
    *,
    access_token: str,
    phone_number_id: str,
    contacts: Iterable[str],
    template_id: str,
    language_code: str,
    per_contact_template_vars: dict[str, list[str]],
    opted_in_store: set[str] | dict[str, bool],
    throttle_per_second: int = 40,
    max_retries: int = 3,
) -> list[dict[str, Any]]:
    """Loop contacts, verify opt-in, send with throttling + retry/backoff."""

    results: list[dict[str, Any]] = []
    delay = 1 / max(throttle_per_second, 1)

    for contact in contacts:
        if not is_opted_in(contact, opted_in_store):
            results.append({"to": contact, "sent": False, "error": "NOT_OPTED_IN"})
            continue

        vars_for_contact = per_contact_template_vars.get(contact, [])
        attempt = 0
        while True:
            attempt += 1
            try:
                response_data = send_whatsapp_template_message(
                    access_token=access_token,
                    phone_number_id=phone_number_id,
                    recipient_phone_number=contact,
                    template_id=template_id,
                    language_code=language_code,
                    template_variables=vars_for_contact,
                )
                results.append({"to": contact, "sent": True, "attempt": attempt, **response_data})
                break
            except requests.HTTPError as exc:
                status = exc.response.status_code if exc.response is not None else None
                body = exc.response.text if exc.response is not None else str(exc)

                # Retry on throttling / transient server failures.
                if status in {429, 500, 502, 503, 504} and attempt < max_retries:
                    sleep_s = 2 ** (attempt - 1)
                    logger.warning("Retrying %s after HTTP %s (attempt %s)", contact, status, attempt)
                    time.sleep(sleep_s)
                    continue

                results.append({"to": contact, "sent": False, "attempt": attempt, "status": status, "error": body})
                break

        time.sleep(delay)

    return results


# -------------------------
# Meta Ads Management
# -------------------------

def get_campaign_insights(
    *,
    access_token: str,
    ad_account_id: str,
    api_version: str = "v21.0",
    date_preset: str = "last_30d",
) -> list[dict[str, Any]]:
    """Retrieve campaign-level insights: name, clicks, impressions, spend."""

    url = f"https://graph.facebook.com/{api_version}/act_{ad_account_id}/insights"
    params = {
        "access_token": access_token,
        "level": "campaign",
        "date_preset": date_preset,
        "fields": "campaign_name,clicks,impressions,spend",
    }

    records: list[dict[str, Any]] = []
    while url:
        response = requests.get(url, params=params if "insights" in url else None, timeout=30)
        response.raise_for_status()
        data = response.json()
        records.extend(data.get("data", []))
        url = data.get("paging", {}).get("next")
        params = None

    return records


@dataclass
class CampaignCreationResult:
    campaign_id: str
    adset_id: str
    creative_id: str
    ad_id: str


def create_campaign_adset_creative_ad(
    *,
    access_token: str,
    ad_account_id: str,
    page_id: str,
    image_hash: str,
    campaign_name: str,
    adset_name: str,
    creative_name: str,
    ad_name: str,
    start_time: str,
    end_time: str,
    daily_budget_minor: int,
    country: str = "US",
    api_version: str = "v21.0",
) -> CampaignCreationResult:
    """Create campaign -> ad set -> creative -> ad with linked IDs."""

    base = f"https://graph.facebook.com/{api_version}/act_{ad_account_id}"

    campaign_resp = requests.post(
        f"{base}/campaigns",
        data={
            "access_token": access_token,
            "name": campaign_name,
            "objective": "LINK_CLICKS",
            "status": "PAUSED",
        },
        timeout=30,
    )
    campaign_resp.raise_for_status()
    campaign_id = campaign_resp.json()["id"]

    adset_resp = requests.post(
        f"{base}/adsets",
        data={
            "access_token": access_token,
            "name": adset_name,
            "campaign_id": campaign_id,
            "daily_budget": daily_budget_minor,
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "REACH",
            "start_time": start_time,
            "end_time": end_time,
            "targeting": json.dumps({"geo_locations": {"countries": [country]}}),
            "status": "PAUSED",
        },
        timeout=30,
    )
    adset_resp.raise_for_status()
    adset_id = adset_resp.json()["id"]

    creative_resp = requests.post(
        f"{base}/adcreatives",
        data={
            "access_token": access_token,
            "name": creative_name,
            "object_story_spec": json.dumps(
                {
                    "page_id": page_id,
                    "link_data": {
                        "message": "Check this out!",
                        "link": "https://example.com",
                        "image_hash": image_hash,
                    },
                }
            ),
        },
        timeout=30,
    )
    creative_resp.raise_for_status()
    creative_id = creative_resp.json()["id"]

    ad_resp = requests.post(
        f"{base}/ads",
        data={
            "access_token": access_token,
            "name": ad_name,
            "adset_id": adset_id,
            "creative": json.dumps({"creative_id": creative_id}),
            "status": "PAUSED",
        },
        timeout=30,
    )
    ad_resp.raise_for_status()
    ad_id = ad_resp.json()["id"]

    return CampaignCreationResult(campaign_id=campaign_id, adset_id=adset_id, creative_id=creative_id, ad_id=ad_id)


def _sha256_normalized_email(email: str) -> str:
    return hashlib.sha256(email.strip().lower().encode("utf-8")).hexdigest()


def create_custom_audience_and_target_adset(
    *,
    access_token: str,
    ad_account_id: str,
    campaign_id: str,
    audience_name: str,
    customer_emails: list[str],
    daily_budget_minor: int,
    api_version: str = "v21.0",
) -> dict[str, str]:
    """Create custom audience from hashed emails and create ad set targeting it."""

    base = f"https://graph.facebook.com/{api_version}"

    audience_resp = requests.post(
        f"{base}/act_{ad_account_id}/customaudiences",
        data={
            "access_token": access_token,
            "name": audience_name,
            "subtype": "CUSTOM",
            "description": "Customer list imported from CRM",
        },
        timeout=30,
    )
    audience_resp.raise_for_status()
    audience_id = audience_resp.json()["id"]

    hashed = [[_sha256_normalized_email(email)] for email in customer_emails]
    users_resp = requests.post(
        f"{base}/{audience_id}/users",
        params={"access_token": access_token},
        json={"schema": ["EMAIL_SHA256"], "data": hashed},
        timeout=30,
    )
    users_resp.raise_for_status()

    adset_resp = requests.post(
        f"{base}/act_{ad_account_id}/adsets",
        data={
            "access_token": access_token,
            "name": f"AdSet - {audience_name}",
            "campaign_id": campaign_id,
            "daily_budget": daily_budget_minor,
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "REACH",
            "targeting": json.dumps(
                {
                    "geo_locations": {"countries": ["US"]},
                    "custom_audiences": [{"id": audience_id}],
                }
            ),
            "status": "PAUSED",
        },
        timeout=30,
    )
    adset_resp.raise_for_status()

    return {"audience_id": audience_id, "adset_id": adset_resp.json()["id"]}


# -------------------------
# Cashfree Billing
# -------------------------

def create_cashfree_subscription_plan(
    *,
    base_url: str,
    client_id: str,
    client_secret: str,
    payload: dict[str, Any],
    api_version: str = "2023-08-01",
) -> dict[str, Any]:
    """Create a Cashfree subscription plan with required headers."""

    response = requests.post(
        f"{base_url}/plans",
        headers={
            "x-client-id": client_id,
            "x-client-secret": client_secret,
            "x-api-version": api_version,
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=30,
    )
    response.raise_for_status()
    return response.json()


def generate_cashfree_payment_link(
    *,
    base_url: str,
    client_id: str,
    client_secret: str,
    payload: dict[str, Any],
    api_version: str = "2023-08-01",
) -> str:
    """Create a one-time Cashfree payment link and return link_url."""

    response = requests.post(
        f"{base_url}/pg/links",
        headers={
            "x-client-id": client_id,
            "x-client-secret": client_secret,
            "x-api-version": api_version,
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=30,
    )
    response.raise_for_status()
    data = response.json()
    return data["link_url"]


def verify_cashfree_webhook_signature(
    *,
    raw_body: bytes,
    webhook_timestamp: str,
    webhook_signature: str,
    webhook_secret: str,
) -> bool:
    """Verify Cashfree webhook HMAC-SHA256 signature."""

    signed_payload = webhook_timestamp.encode("utf-8") + raw_body
    expected = hmac.new(webhook_secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, webhook_signature)


def handle_cashfree_webhook(
    *,
    raw_body: bytes,
    webhook_timestamp: str,
    webhook_signature: str,
    webhook_secret: str,
) -> dict[str, Any]:
    """Example webhook event parser for PAYMENT_LINK charge events."""

    if not verify_cashfree_webhook_signature(
        raw_body=raw_body,
        webhook_timestamp=webhook_timestamp,
        webhook_signature=webhook_signature,
        webhook_secret=webhook_secret,
    ):
        raise ValueError("Invalid Cashfree webhook signature")

    payload = json.loads(raw_body.decode("utf-8"))
    event = payload.get("type")

    if event == "PAYMENT_LINK_CHARGE_COMPLETED":
        status = "SUCCESS"
    elif event == "PAYMENT_LINK_CHARGE_FAILED":
        status = "FAILED"
    else:
        status = "IGNORED"

    return {
        "ack": True,
        "event": event,
        "status": status,
        "order_reference": payload.get("data", {}).get("order", {}).get("order_id"),
    }

from __future__ import annotations

from typing import Annotated

from fastapi import Depends, FastAPI, Header, HTTPException
from pydantic import BaseModel

app = FastAPI()


class UserContext(BaseModel):
    tenant_id: str
    role: str


def auth_context(
    x_tenant_id: Annotated[str, Header()],
    x_user_role: Annotated[str, Header()],
) -> UserContext:
    # In production, decode JWT and read tenant/role claims.
    return UserContext(tenant_id=x_tenant_id, role=x_user_role)


class Contact(BaseModel):
    id: str
    tenant_id: str
    name: str
    email: str


class Deal(BaseModel):
    id: str
    tenant_id: str
    title: str
    stage: str


class PipelineStage(BaseModel):
    id: str
    tenant_id: str
    name: str


CONTACTS: list[Contact] = []
DEALS: list[Deal] = []
STAGES: list[PipelineStage] = []


def assert_admin(ctx: UserContext) -> None:
    if ctx.role.lower() != 'admin':
        raise HTTPException(status_code=403, detail='Admin role required')


@app.get('/contacts')
def list_contacts(ctx: Annotated[UserContext, Depends(auth_context)]):
    return [c for c in CONTACTS if c.tenant_id == ctx.tenant_id]


@app.post('/contacts')
def create_contact(contact: Contact, ctx: Annotated[UserContext, Depends(auth_context)]):
    contact.tenant_id = ctx.tenant_id
    CONTACTS.append(contact)
    return contact


@app.get('/deals')
def list_deals(ctx: Annotated[UserContext, Depends(auth_context)]):
    return [d for d in DEALS if d.tenant_id == ctx.tenant_id]


@app.patch('/deals/{deal_id}')
def update_deal_stage(deal_id: str, payload: dict, ctx: Annotated[UserContext, Depends(auth_context)]):
    for deal in DEALS:
        if deal.id == deal_id and deal.tenant_id == ctx.tenant_id:
            deal.stage = payload.get('stage', deal.stage)
            return deal
    raise HTTPException(status_code=404, detail='Deal not found')


@app.get('/pipeline_stages')
def list_stages(ctx: Annotated[UserContext, Depends(auth_context)]):
    return [s for s in STAGES if s.tenant_id == ctx.tenant_id]


@app.post('/pipeline_stages')
def create_stage(stage: PipelineStage, ctx: Annotated[UserContext, Depends(auth_context)]):
    assert_admin(ctx)
    stage.tenant_id = ctx.tenant_id
    STAGES.append(stage)
    return stage


@app.delete('/pipeline_stages/{stage_id}')
def delete_stage(stage_id: str, ctx: Annotated[UserContext, Depends(auth_context)]):
    assert_admin(ctx)
    for index, stage in enumerate(STAGES):
        if stage.id == stage_id and stage.tenant_id == ctx.tenant_id:
            STAGES.pop(index)
            return {'deleted': True}
    raise HTTPException(status_code=404, detail='Stage not found')

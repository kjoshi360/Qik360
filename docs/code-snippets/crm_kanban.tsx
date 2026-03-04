import React, { useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';

type Stage = 'NEW' | 'IN_PROGRESS' | 'CLOSED';

type Deal = {
  id: string;
  title: string;
  value: number;
  stage: Stage;
};

const STAGES: Stage[] = ['NEW', 'IN_PROGRESS', 'CLOSED'];

export function DealsKanban({ initialDeals, token }: { initialDeals: Deal[]; token: string }) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);

  const grouped = useMemo(() => {
    return STAGES.reduce<Record<Stage, Deal[]>>((acc, stage) => {
      acc[stage] = deals.filter((deal) => deal.stage === stage);
      return acc;
    }, { NEW: [], IN_PROGRESS: [], CLOSED: [] });
  }, [deals]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const dealId = result.draggableId;
    const newStage = result.destination.droppableId as Stage;

    setDeals((prev) => prev.map((deal) => (deal.id === dealId ? { ...deal, stage: newStage } : deal)));

    try {
      await axios.patch(
        `/api/v1/crm/deals/${dealId}`,
        { stage: newStage },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch {
      // naive rollback for snippet
      setDeals((prev) => prev.map((deal) => (deal.id === dealId ? { ...deal, stage: result.source.droppableId as Stage } : deal)));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {STAGES.map((stage) => (
          <Droppable key={stage} droppableId={stage}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
                <h3>{stage}</h3>
                {grouped[stage].map((deal, index) => (
                  <Draggable key={deal.id} draggableId={deal.id} index={index}>
                    {(dragProvided) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={{ padding: 10, marginBottom: 8, border: '1px solid #bbb', borderRadius: 6, background: '#fff' }}
                      >
                        <strong>{deal.title}</strong>
                        <div>${deal.value}</div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = () => {
  // Initial job categories and job cards
  const [jobs, setJobs] = useState({
    applied: [
      { id: '1', title: 'Software Engineer', company: 'Google' },
      { id: '2', title: 'Data Analyst', company: 'Facebook' },
    ],
    accepted: [],
    offerReceived: [],
    rejected: [],
  });

  // Handle drag and drop logic
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside any column
    if (!destination) return;

    const sourceColumn = [...jobs[source.droppableId]];
    const destColumn = [...jobs[destination.droppableId]];

    // Remove from source and add to destination
    const [movedJob] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedJob);

    setJobs({
      ...jobs,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 p-6">
        {Object.keys(jobs).map((columnId) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div
                className="bg-gray-100 p-4 rounded-lg shadow-md w-1/4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h2 className="text-xl font-semibold mb-4 capitalize">{columnId}</h2>
                {jobs[columnId].map((job, index) => (
                  <Draggable key={job.id} draggableId={job.id} index={index}>
                    {(provided) => (
                      <div
                        className="bg-white p-4 mb-3 rounded shadow-md"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
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
};

export default KanbanBoard;

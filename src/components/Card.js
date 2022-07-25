
import { Row, Col } from 'antd';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "../components/Card.scss"

const finalSpaceCharacters = [
  {
    id: 'Google',
    name: 'Google',
    thumb: '/images/GOOGL.png',
    stock: "1515 USD"

  },
  {
    id: 'FB',
    name: 'FB',
    thumb: '/images/FB.png',
    stock: "266 USD"

  },
  {
    id: 'Amazon',
    name: 'Amazon',
    thumb: "/images/AMZN.svg",
    stock: "3116 USD"
  },

]

const Card = () => {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="card">
      <header className="Card-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <Row className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({ id, name, thumb, stock }, index) => {
                  return (
                    <Draggable className="card" key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Col ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} />
                          </div>
                          <p className='name'>
                            {name}
                          </p>
                          <p className='stock'>
                            {stock}
                          </p>
                        </Col>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Row>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default Card;

import React, { useState } from 'react'
import { motion } from "framer-motion";

const BoardColumn = ({ title, headingColor, column, cards, setCards }) => {

    const [active, setActive] = useState(false);
    const filteredCards = cards.filter(c => c.column === column);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    }

    const handleDragLeave = (e) => {
        clearHighlights();
        setActive(false);
    }

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");
        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id == cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id != cardId);

            const moveToBack = before == "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id == before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            setCards(copy);
        }
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    return (
        <div className='w-80 md:shrink xs:shrink-0'>
            <div className='mb-3 flex items-center justify-between'>
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className='rounded text-sm text-neutral-400'>{filteredCards.length}</span>
            </div>
            <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDragEnd} className={`h-full w-full transition-colors ${active ? "bg-slate-100/50" : "bg-neutral-100/0"}`}>
                {
                    filteredCards.map((card) => {
                        return <Card key={card.id} {...card} handleDragStart={handleDragStart} />
                    })
                }
                <DropIndicator beforeId={null} column={column} />
            </div>
        </div>
    )
}


const Card = ({ title, id, column, handleDragStart }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div layout
                layoutId={id} draggable="true" onDragStart={(e) => { handleDragStart(e, { title, id, column }) }} className='cursor-grab rounded border border-slate-200 bg-white shadow-md p-3 active:cursor-grabbing'>
                <p className='text-sm'>{title}</p>
            </motion.div>
        </>
    )
}

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-1 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

export default BoardColumn

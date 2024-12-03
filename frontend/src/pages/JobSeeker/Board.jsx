import { useState } from "react"
import BoardColumn from "./BoardColumn"

const data = [
    { title: "Software Engineer", id: 1, column: "appliedJobs" },
    { title: "Frontend Developer", id: 2, column: "interview" },
    { title: "Backend Developer", id: 3, column: "appliedJobs" },
    { title: "Full Stack Developer", id: 4, column: "offer" },
    { title: "DevOps Engineer", id: 5, column: "appliedJobs" },
    { title: "Data Scientist", id: 6, column: "reject" },
    { title: "Machine Learning Engineer", id: 7, column: "interview" },
    { title: "Product Manager", id: 8, column: "offer" },
    { title: "Software Architect", id: 9, column: "reject" },
    { title: "QA Engineer", id: 10, column: "appliedJobs" }
];

export const Board = () => {
    const [cards, setCards] = useState(data)
    return (
        <div className='flex h-full w-full gap-4 overflow-scroll p-12 justify-between'>
            <BoardColumn
                title="Applied Jobs"
                column="appliedJobs"
                headingColor="text-natural-500"
                cards={cards}
                setCards={setCards}
            />
            <BoardColumn
                title="Interview"
                column="interview"
                headingColor="text-yello-300"
                cards={cards}
                setCards={setCards}
            />
            <BoardColumn
                title="Rejection"
                column="reject"
                headingColor="text-red-500"
                cards={cards}
                setCards={setCards}
            />
            <BoardColumn
                title="Offer"
                column="offer"
                headingColor="text-green-500"
                cards={cards}
                setCards={setCards}
            />
        </div>
    )
}

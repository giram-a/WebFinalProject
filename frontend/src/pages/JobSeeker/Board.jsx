import { useState, useEffect } from "react"
import BoardColumn from "./BoardColumn"
import useUserStore from "@/features/user/userStore";
import { useAuth, useUser } from "@clerk/clerk-react";

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
    const [cards, setCards] = useState([])

    const { user: UserData, fetchUser } = useUserStore();

    const { getToken, isLoaded } = useAuth()
    const { user, isLoaded: isUserLoaded } = useUser()

    if (!isLoaded && !isUserLoaded) {
        return "Loading ...."
    }

    useEffect(() => {
        if (!UserData || Object.keys(UserData).length === 0) {
            (async () => {
                const token = await getToken();
                fetchUser({ id: user.id, token })
            })()
        }
    }, [UserData, fetchUser, user]);


    useEffect(() => {
        if (UserData?.appliedJob) {
            setCards(UserData?.appliedJob);
            const output = UserData?.appliedJob.map(item => ({
                title: item.details.jobTitle,
                id: item.jobId,
                column: item.details.state,
                details: {
                    companyName: item.details.companyName,
                    date: formatDate(item.details.date)
                }
            }));
            console.log(output);
            setCards(output)
        }
    }, [UserData])


    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Convert to Boston time (America/New_York)
        const options = {
            timeZone: "America/New_York",
            hour: "2-digit",
            minute: "2-digit",
            year: "numeric",
            day: "2-digit",
            month: "2-digit",
            hourCycle: "h23" // Ensures 24-hour format
        };

        // Format the date
        const formattedDate = new Intl.DateTimeFormat("en-US", options).formatToParts(date);

        const time = `${formattedDate.find(p => p.type === 'hour').value}:${formattedDate.find(p => p.type === 'minute').value}`;
        const year = formattedDate.find(p => p.type === 'year').value;
        const day = formattedDate.find(p => p.type === 'day').value;
        const month = formattedDate.find(p => p.type === 'month').value;

        return `Time: ${time} Date: ${year}:${day}:${month}`;
    };

    return (
        <div className='flex h-full w-full gap-4 overflow-scroll p-12 justify-between'>
            <BoardColumn
                title="Applied Jobs"
                column="applied"
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

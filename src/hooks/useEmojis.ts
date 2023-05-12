import {Octokit} from "@octokit/rest";
import {useEffect, useState} from "react";

interface Emoji  {
    [key: string]: any;
}

export const useEmojis = () => {
    const [emojis, setEmojis] = useState<Emoji>([]);
    const [isLoadingEmojis, setIsLoadingEmojis] = useState<boolean>(true);

    useEffect(() => {
        const octokit = new Octokit();
        const getEmojis = async () => {
            console.log('fetching')
            const res = await octokit.rest.emojis.get()
            setEmojis(res.data)
            setIsLoadingEmojis(false);
        };
        getEmojis();
    }, []);

    return {
        emojis,
        isLoadingEmojis
    };
}
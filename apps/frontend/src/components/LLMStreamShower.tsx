import baseUrl from '@/hooks/baseUrl';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const StreamedData = ({ id }: { id: string }) => {
    const [response, setResponse] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStreamedData = async () => {
            try {
                const response = await fetch(`${baseUrl}players/${id}/description`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.body) {
                    console.error('No response body');
                    setLoading(false);
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let done = false;

                while (!done) {
                    const { value, done: readerDone } = await reader.read();
                    done = readerDone;
                    setResponse((prev) => prev + decoder.decode(value, { stream: true }));
                }
            } catch (error) {
                console.error('Error fetching streamed data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStreamedData();
    }, []);

    return (
        <Card className="w-[80%] flex-grow overflow-hidden flex flex-col">
            <CardHeader>
                <CardTitle>Description from LLM: </CardTitle>
            </CardHeader>
            <CardContent className='flex-grow overflow-auto'>
                <div>{response}</div>
            </CardContent>
        </Card>
    );
};

export default StreamedData;

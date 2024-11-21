'use client'
import Form from 'react-bootstrap/Form';
import { IBlog } from '@/types/backend';
import useSWR from 'swr'


const DetailBlog = ({ params, }: { params: { id: string } }) => {

    // console.log('check props', props.params.id)
    const id = params.id

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR<IBlog>(`http://localhost:8000/blogs/${id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        })

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return <div>Error loading data</div>
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={data?.title} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" value={data?.author} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" value={data?.content} rows={7} />
                </Form.Group>
            </Form>
        </div>
    )
}

export default DetailBlog
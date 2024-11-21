'use client'
import Table from 'react-bootstrap/Table';
import useSWR from 'swr'
import { Button } from 'react-bootstrap'
import { IBlog } from '../../types/backend'
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSWRConfig } from "swr"

function AppTable() {

    const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const [dataBlog, setDataBlog] = useState<IBlog | null>(null);
    const router = useRouter()
    const { mutate } = useSWRConfig()

    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR<IBlog[]>('http://localhost:8000/blogs',
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        })

    const handleEditBlog = (item: IBlog) => {
        setShowEditModal(true)
        setDataBlog(item)
    }

    const handleDeleteBlog = async (item: IBlog) => {
        const userConfirmed = confirm(`Are you sure you want to delete blog id: ${item.id}?`);
        if (userConfirmed) {
            const res = await fetch(`http://localhost:8000/blogs/${item.id}`, { method: 'DELETE' });
            if (res?.status === 200) {
                toast.success('Blog deleted');
                mutate('http://localhost:8000/blogs');
            }
            else { toast.error('Something went wrong'); }
        }
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return <div>Error loading data</div>
    }
    return (
        <>
            <div className='mb-3'
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <h3>Table Blogs</h3>
                <Button onClick={() => setShowCreateModal(true)}
                    variant='primary'>Add new</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length && data?.sort((a: any, b: any) => b.id - a.id) &&
                        data.map((item, index) => {
                            return (
                                <tr key={`datablog${index}`}>
                                    <td> {item?.id} </td>
                                    <td>{item?.title}</td>
                                    <td>{item?.author}</td>
                                    <td>
                                        <Button onClick={() => router.push(`/blogs/${item.id}`)}
                                            variant='primary' className='mx-2'>Detail</Button>
                                        <Button onClick={() => handleEditBlog(item)}
                                            variant='warning' className='mx-2'>Edit</Button>
                                        <Button onClick={() => handleDeleteBlog(item)}
                                            variant='danger' className='mx-2'>Delete</Button>
                                    </td>

                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <CreateModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal} />
            {dataBlog && (
                <UpdateModal showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    dataBlog={dataBlog} />
            )}
        </>
    );
}

export default AppTable;
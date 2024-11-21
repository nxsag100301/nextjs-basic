'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from "swr"
import { IBlog } from '@/types/backend';

interface IProps {
    showEditModal: boolean;
    setShowEditModal: (value: boolean) => void
    dataBlog: IBlog | null
}

function UpdateModal(props: IProps) {

    const { showEditModal, setShowEditModal, dataBlog } = props
    const [id, setId] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const { mutate } = useSWRConfig()

    useEffect(() => {
        if (dataBlog && dataBlog.id) {
            setId(dataBlog?.id)
            setTitle(dataBlog?.title)
            setAuthor(dataBlog?.author)
            setContent(dataBlog?.content)
        }
    }, [dataBlog])


    const handleEditBlog = async () => {
        if (!title || !author || !content) {
            toast.error('Invalid input')
            return
        }
        const res = await fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                author: author,
                content: content
            })
        });
        const data = await res.json();
        if (res?.status === 200) {
            toast.success('Edited')
            mutate('http://localhost:8000/blogs')
            handleCloseModal()
        }
        else {
            toast.error('Something wrong')
        }
    }

    const handleCloseModal = () => {
        setShowEditModal(false)
    }

    return (
        <>
            <Modal
                show={showEditModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title}
                                onChange={(event) => setTitle(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author}
                                onChange={(event) => setAuthor(event.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" value={content} rows={5}
                                onChange={(event) => setContent(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditBlog()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;
'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSWRConfig } from "swr"

interface IProps {
    showCreateModal: boolean;
    setShowCreateModal: (value: boolean) => void
}

function CreateModal(props: IProps) {

    const { showCreateModal, setShowCreateModal } = props
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const { mutate } = useSWRConfig()



    const handleAddNewBlog = async () => {
        if (!title || !author || !content) {
            toast.error('Invalid input')
            return
        }
        const res = await fetch('http://localhost:8000/blogs', {
            method: 'POST',
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
        if (res?.status === 201) {
            toast.success('Blog created')
            mutate('http://localhost:8000/blogs')
            handleCloseModal()
        }
        else {
            toast.error('Something wrong')
        }
    }

    const handleCloseModal = () => {
        setTitle('')
        setAuthor('')
        setContent('')
        setShowCreateModal(false)
    }

    return (
        <>
            <Modal
                show={showCreateModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new blog</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleAddNewBlog()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateModal;
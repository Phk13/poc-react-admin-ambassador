import { Button, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Layout from '../../components/Layout'

export default function ProductForm(props: any) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false)
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            (
                async () => {
                    const { data } = await axios.get(`products/${params.id}`);

                    setTitle(data.title);
                    setDescription(data.description);
                    setImage(data.image);
                    setPrice(data.price);
                }
            )();
        }
    }, []);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            title,
            description,
            image,
            price: Number(price)
        }

        if (params.id) {
            await axios.put(`/products/${params.id}`, data);
        } else {
            await axios.post('products', data);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/products'} />;
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className='mb-3'>
                    <TextField label='Title'
                        value={title} onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <TextField label='Description' rows={4} multiline
                        value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <TextField label='Image'
                        value={image} onChange={e => setImage(e.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <TextField label='Price' type='number'
                        value={price} onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <Button variant='contained' color='primary' type="submit">Submit</Button>
            </form>
        </Layout>
    )
}

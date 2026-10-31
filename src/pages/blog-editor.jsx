import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categories, coverChoices, createPost, readTime, updatePost } from '../common-pages/blogApi';

// Crop an uploaded picture to 16:9 and shrink it to 800×450, so it stays small in db.json
const resizeCover = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('This file is not a picture'));
        img.onload = () => {
            const w = 800, h = 450;
            const scale = Math.max(w / img.width, h / img.height);
            const sw = w / scale, sh = h / scale;
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            canvas.getContext('2d').drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, w, h);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

// /blog/new and /blog/:id/edit
export default function BlogEditorPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileRef = useRef(null);
    const user = sessionStorage.getItem('username') || '';
    const [form, setForm] = useState({ title: '', category: categories[0], tags: '', image: coverChoices[0], content: '' });
    const [status, setStatus] = useState(id ? 'loading' : 'ready');
    const [isSaving, setIsSaving] = useState(false);

    // Editing: load the post (only its author may edit it)
    useEffect(() => {
        if (!id) {
            return;
        }
        fetch('http://localhost:8000/post/' + id).then((res) => res.ok ? res.json() : null).then((post) => {
            if (!post || post.author !== user) {
                setStatus('forbidden');
                return;
            }
            setForm({ title: post.title, category: post.category, tags: (post.tags || []).join(', '), image: post.image, content: post.content });
            setStatus('ready');
        }).catch(() => setStatus('forbidden'));
    }, [id, user]);

    if (status === 'forbidden') {
        toast.warning('You can only edit your own posts');
        return <Navigate to={id ? '/blog/' + id : '/blog'} replace />;
    }

    const field = (key) => ({ value: form[key], onChange: (e) => setForm({ ...form, [key]: e.target.value }) });

    const uploadCover = (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        if (!file) {
            return;
        }
        if (!file.type.startsWith('image/') || file.size > 8 * 1024 * 1024) {
            toast.warning('Please choose a picture smaller than 8 MB');
            return;
        }
        resizeCover(file).then((dataUrl) => setForm((f) => ({ ...f, image: dataUrl }))).catch((err) => toast.error(err.message));
    };

    const save = (e) => {
        e.preventDefault();
        const title = form.title.trim();
        const content = form.content.trim();
        if (title.length < 5) {
            toast.warning('Please give the post a title (at least 5 characters)');
            return;
        }
        if (content.length < 50) {
            toast.warning('Please write a little more (at least 50 characters)');
            return;
        }
        // Unique tags, ignoring capitals ("Lofi" and "lofi" are one tag), at most 5
        const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
            .filter((t, i, all) => all.findIndex((x) => x.toLowerCase() === t.toLowerCase()) === i).slice(0, 5);
        const data = { title, category: form.category, tags, image: form.image, content };
        setIsSaving(true);
        const request = id
            ? updatePost(id, { ...data, edited: new Date().toISOString() })
            : createPost({ ...data, author: user, date: new Date().toISOString(), likes: [] });
        request.then((post) => {
            toast.success(id ? 'Post updated' : 'Post published');
            navigate('/blog/' + post.id);
        }).catch(() => {
            toast.error('Could not save the post. Is the json-server running?');
            setIsSaving(false);
        });
    };

    if (status === 'loading') {
        return <section className="scrollable wrapper-lg noJsplayer"><p className="text-muted">Loading post…</p></section>;
    }

    return (
        <section className="scrollable wrapper-lg noJsplayer blog-page">
            <Link to={id ? '/blog/' + id : '/blog'} className="text-muted"><i className="fa fa-chevron-left m-r-xs"></i>{id ? 'Back to the post' : 'All posts'}</Link>
            <h2 className="font-thin m-t-sm">{id ? 'Edit post' : 'Write a post'}</h2>
            <form className="blog-editor" onSubmit={save}>
                <div className="row">
                    <div className="col-sm-8">
                        <label>Title</label>
                        <input type="text" className="form-control input-lg" placeholder="A catchy title" maxLength={120} autoFocus {...field('title')} />
                        <label>Your post</label>
                        <textarea className="form-control" rows="14" placeholder={'Write your post here.\n\nLeave an empty line between paragraphs.'} {...field('content')}></textarea>
                        <small className="text-muted">{form.content.trim() ? `${form.content.trim().split(/\s+/).length} words · ${readTime(form.content)}` : 'At least 50 characters'}</small>
                    </div>
                    <div className="col-sm-4">
                        <label>Category</label>
                        <select className="form-control" {...field('category')}>
                            {categories.map((c) => <option key={c}>{c}</option>)}
                        </select>
                        <label>Tags</label>
                        <input type="text" className="form-control" placeholder="e.g. Playlists, Guide" {...field('tags')} />
                        <small className="text-muted">Separate with commas, up to 5.</small>
                        <label>Cover picture</label>
                        <div className="blog-cover-preview">
                            <img src={form.image} alt="Cover" />
                        </div>
                        <div className="blog-cover-choices">
                            {coverChoices.map((src) => (
                                <button type="button" key={src} className={form.image === src ? 'on' : ''} onClick={() => setForm({ ...form, image: src })} title="Use this picture">
                                    <img src={src} alt="" />
                                </button>
                            ))}
                        </div>
                        <button type="button" className="btn btn-default btn-rounded btn-sm m-t-sm" onClick={() => fileRef.current.click()}>
                            <i className="fa fa-upload m-r-xs"></i>Upload your own
                        </button>
                        <input type="file" accept="image/*" ref={fileRef} className="hide" onChange={uploadCover} />
                    </div>
                </div>
                <div className="m-t-lg">
                    <button type="submit" className="btn btn-info btn-rounded m-r-xs" disabled={isSaving}>
                        <i className="fa fa-check m-r-xs"></i>{isSaving ? 'Saving…' : id ? 'Save changes' : 'Publish'}
                    </button>
                    <Link to={id ? '/blog/' + id : '/blog'} className="btn btn-default btn-rounded">Cancel</Link>
                </div>
            </form>
        </section>
    );
}

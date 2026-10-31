import { useState } from 'react';
import { toast } from 'react-toastify';
import { timeAgo } from './useNotifications';
import { Avatar } from './avatar';
import { useLibrary } from './libraryContext';

export default function CommentSection({ comments, addComment }) {
    const library = useLibrary();
    const [name, namechange] = useState(sessionStorage.getItem('username') || '');
    const [email, emailchange] = useState('');
    const [text, textchange] = useState('');
    const [isSending, setIsSending] = useState(false);

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Please enter ';

        if (name.trim() === '') {
            isproceed = false;
            errormessage += 'Name ';
        }
        if (email.trim() === '') {
            isproceed = false;
            errormessage += 'Email ';
        }
        if (text.trim() === '') {
            isproceed = false;
            errormessage += 'Comment';
        }
        if (!isproceed) {
            toast.warning(errormessage);
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isproceed = false;
            toast.warning('Please enter the valid email');
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!IsValidate()) {
            return;
        }
        setIsSending(true);
        addComment({ name: name.trim(), email: email.trim(), text: text.trim(), image: library.avatar }).then(() => {
            toast.success('Comment posted');
            textchange('');
        }).catch((err) => {
            toast.error('Failed :' + err.message);
        }).finally(() => {
            setIsSending(false);
        });
    }

    return (
        <>
            <h4 className="m-t-lg m-b">{comments.length} Comment{comments.length === 1 ? '' : 's'}</h4>
            <section className="comment-list block">
                {comments.map((item) => (
                    <article key={item.id} className={item.reply ? "comment-item comment-reply" : "comment-item"}>
                        <a className="pull-left thumb-sm">
                            <Avatar name={item.name} image={item.image} />
                        </a>
                        <section className="comment-body m-b">
                            <header>
                                <strong className="text-capitalize">{item.name}</strong>
                                {item.role && <label className={item.role === 'Editor' ? "label bg-info m-l-xs" : "label bg-dark m-l-xs"}>{item.role}</label>}
                                <span className="text-muted text-xs block m-t-xs">
                                    {timeAgo(item.time)}
                                </span>
                            </header>
                            {item.quote && (
                                <blockquote className="m-t">
                                    <p>{item.quote.text}</p>
                                    <small>{item.quote.source}</small>
                                </blockquote>
                            )}
                            <div className="m-t-sm comment-text">{item.text}</div>
                        </section>
                    </article>
                ))}
            </section>
            <h4 className="m-t-lg m-b">Leave a comment</h4>
            <form onSubmit={handlesubmit}>
                <div className="form-group pull-in clearfix">
                    <div className="col-sm-6">
                        <label>Your name</label>
                        <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => namechange(e.target.value)} />
                    </div>
                    <div className="col-sm-6">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={e => emailchange(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea className="form-control" rows="5" placeholder="Type your comment" value={text} onChange={e => textchange(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success" disabled={isSending}>
                        {isSending ? 'Submitting...' : 'Submit comment'}
                    </button>
                </div>
            </form>
        </>
    )
}

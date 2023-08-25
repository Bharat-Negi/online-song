import ConnectedData from '../json-data/connected.json'

export default function Connected() {
    return (
        <aside className="aside-md bg-light dk">
            <section className="vbox animated fadeInRight">
                <section className="w-f-md scrollable hover">
                    <h4 className="font-thin m-l-md m-t">Connected</h4>
                    <ul className="list-group no-bg no-borders auto m-t-n-xxs">
                        {
                            ConnectedData && ConnectedData.map(ConnectedData => {
                                return (
                                    <li className="list-group-item" key={ConnectedData.id}>
                                        <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm">
                                            <img src={ConnectedData.connectImg} alt="..." className="img-circle" />
                                            {ConnectedData.connectOn == 'online' ? <i className="on b-light right sm"></i> : null}
                                            {ConnectedData.connectOn == 'offline' ? <i className="busy b-light right sm"></i> : null}
                                            {ConnectedData.connectOn == 'away' ? <i className="away b-light right sm"></i> : null}                                            
                                        </span>
                                        <div className="clear">
                                            <div><a href="#">{ConnectedData.connectName}</a></div>
                                            <small className="text-muted">{ConnectedData.connectCity}</small>
                                        </div>
                                    </li>
                                )
                            })
                        }                        
                    </ul>
                </section>
                <footer className="footer footer-md bg-black">
                    <form className="" role="search">
                        <div className="form-group clearfix m-b-none">
                            <div className="input-group m-t m-b">
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-sm bg-empty text-muted btn-icon"><i className="fa fa-search"></i></button>
                                </span>
                                <input type="text" className="form-control input-sm text-white bg-empty b-b b-dark no-border" placeholder="Search members" />
                            </div>
                        </div>
                    </form>
                </footer>
            </section>
        </aside>
    )
}
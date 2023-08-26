import JsPlayer from '../common-pages/jsPlayer'
import Connected from '../common-pages/connected'
import DiscoverPage from '../component/discover'
import NewSongs from '../component-small/new-songs'
import TopSongs from '../component-small/top-songs'

export default function whatsNew() {
    return (
        <section>
            <section className="hbox stretch">
                <section>
                    <section className="vbox">
                        <section className="scrollable padder-lg w-f-md">
                            <a href="#" className="pull-right text-muted m-t-lg">
                                <i className="icon-refresh i-lg  inline" id="refresh"></i>
                            </a>
                            <h2 className="font-thin m-b">
                                Discover <span className="musicbar animate inline m-l-sm" style={{ width: '20px', height: '20px' }}>
                                    <span className="bar1 a1 bg-primary lter"></span>
                                    <span className="bar2 a2 bg-info lt"></span>
                                    <span className="bar3 a3 bg-success"></span>
                                    <span className="bar4 a4 bg-warning dk"></span>
                                    <span className="bar5 a5 bg-danger dker"></span>
                                </span>
                            </h2>

                            <DiscoverPage />
                            <div className="row">
                                <NewSongs />
                                <TopSongs />
                            </div>                           

                            <div className="row m-t-lg m-b-lg">
                                <div className="col-sm-6">
                                    <div className="bg-primary wrapper-md r">
                                        <a href="#">
                                            <span className="h4 m-b-xs block"><i className=" icon-user-follow i-lg"></i> Login or Create account</span>
                                            <span className="text-muted">Save and share your playlist with your friends when you log in or create an account.</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="bg-black wrapper-md r">
                                        <a href="#">
                                            <span className="h4 m-b-xs block"><i className="icon-cloud-download i-lg"></i> Download our app</span>
                                            <span className="text-muted">Get the apps for desktop and mobile to start listening music at anywhere and anytime.</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <JsPlayer />
                    </section>
                </section>
                <Connected />
            </section>
        </section>
    )
}
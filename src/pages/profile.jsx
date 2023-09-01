import ProfileTab from '../component-small/profile-tab'
import ProfileDetails from '../component-small/profile-details'

export default function profile() {
  return (
    <>
      <section className="scrollable noJsplayer">
        <section className="hbox stretch">
          <ProfileDetails />
          <ProfileTab />
          <aside className="col-lg-3 b-l">
            <section className="vbox">
              <section className="scrollable padder-v profileScroll">
                <div className="panel">
                  <h4 className="font-thin padder">Latest Tweets</h4>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <p>Wellcome <a href="#" className="text-info">@Drew Wllon</a> and play this web application template, have fun1 </p>
                      <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 minuts ago</small>
                    </li>
                    <li className="list-group-item">
                      <p>Morbi nec <a href="#" className="text-info">@Jonathan George</a> nunc condimentum ipsum dolor sit amet, consectetur</p>
                      <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 hour ago</small>
                    </li>
                    <li className="list-group-item">
                      <p><a href="#" className="text-info">@Josh Long</a> Vestibulum ullamcorper sodales nisi nec adipiscing elit. Morbi id neque quam. Aliquam sollicitudin venenatis</p>
                      <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 hours ago</small>
                    </li>
                  </ul>
                </div>
                <div className="panel clearfix">
                  <div className="panel-body">
                    <a href="#" className="thumb pull-left m-r">
                      <img src="images/a0.png" className="img-circle" />
                    </a>
                    <div className="clear">
                      <a href="#" className="text-info">@Mike Mcalidek <i className="fa fa-twitter"></i></a>
                      <small className="block text-muted">2,415 followers / 225 tweets</small>
                      <a href="#" className="btn btn-xs btn-success m-t-xs">Follow</a>
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </aside>
        </section>
      </section>
    </>
  )
}
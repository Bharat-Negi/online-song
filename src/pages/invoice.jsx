export default function InvoicePage() {
    return (
        <>
            <header className="header bg-light lter hidden-print">
                <a href="#" className="btn btn-sm btn-info pull-right">Print</a>
                <p>Invoice</p>
            </header>
            <section className="scrollable wrapper bg-white">
                <i className="fa fa-apple fa fa-3x"></i>
                <div className="row">
                    <div className="col-xs-6">
                        <h4>Apple Inc.</h4>
                        <p><a href="http://www.apple.com">www.apple.com</a></p>
                        <p>1 Infinite Loop <br />
                            95014 Cuperino, CA<br />
                            United States
                        </p>
                        <p>
                            Telephone:  800-692-7753<br />
                            Fax:  800-692-7753
                        </p>
                    </div>
                    <div className="col-xs-6 text-right">
                        <p className="h4">#9048392</p>
                        <h5>29th Mar 2013</h5>
                    </div>
                </div>
                <div className="well bg-light b m-t">
                    <div className="row">
                        <div className="col-xs-6">
                            <strong>TO:</strong>
                            <h4>John Smith</h4>
                            <p>
                                2nd Floor<br />
                                St John Street, Aberdeenshire 2541<br />
                                United Kingdom<br />
                                Phone: 031-432-678<br />
                                Email: youemail@gmail.com<br />
                            </p>
                        </div>
                        <div className="col-xs-6">
                            <strong>SHIP TO:</strong>
                            <h4>John Smith</h4>
                            <p>
                                2nd Floor<br />
                                St John Street, Aberdeenshire 2541<br />
                                United Kingdom<br />
                                Phone: 031-432-678<br />
                                Email: youemail@gmail.com<br />
                            </p>
                        </div>
                    </div>
                </div>
                <p className="m-t m-b">Order date: <strong>26th Mar 2013</strong><br />
                    Order status: <span className="label bg-success">Shipped</span><br />
                    Order ID: <strong>#9399034</strong>
                </p>
                <div className="line"></div>
                <table className="table">
                    <thead>
                        <tr>
                            <th style={{width: '60px'}}>QTY</th>
                            <th>DESCRIPTION</th>
                            <th style={{width: '140px'}}>UNIT PRICE</th>
                            <th style={{width: '90px'}}>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>iPhone 5 32GB White & Silver (GSM) Unlocked</td>
                            <td>$749.00</td>
                            <td>$749.00</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>iPad mini with Wi-Fi 32GB - White & Silver</td>
                            <td>$429.00</td>
                            <td>$858.00</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-right"><strong>Subtotal</strong></td>
                            <td>$1607.00</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-right no-border"><strong>Shipping</strong></td>
                            <td>$0.00</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-right no-border"><strong>VAT Included in Total</strong></td>
                            <td>$0.00</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="text-right no-border"><strong>Total</strong></td>
                            <td><strong>$1607.00</strong></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    )
}
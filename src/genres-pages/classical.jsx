import GenresData from '../json-data/genres.json';

export default function ClassicalPage() {
    return(
        <>
            <h2 className="font-thin m-b text-capitalize">{GenresData[3].genTag}</h2>
            <div className="row row-sm">
                {
                    GenresData[3].alldata && GenresData[3].alldata.map((GenresData, idx) => {
                        return (
                            <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
                                <div className="item">
                                    <div className="pos-rlt">
                                        <div className="item-overlay opacity r r-2x bg-black">
                                            <div className="center text-center m-t-n">
                                                <a href={GenresData.genLink}><i className="fa fa-play-circle i-2x"></i></a>
                                            </div>
                                        </div>
                                        <a href={GenresData.genLink}>
                                            <img src={GenresData.genImg} alt="" className="r r-2x img-full" />
                                        </a>
                                    </div>
                                    <div className="padder-v">
                                        <a href={GenresData.genLink} className="text-ellipsis">{GenresData.genName}</a>
                                        <a href={GenresData.genLink} className="text-ellipsis text-xs text-muted">{GenresData.genSinger}</a>
                                    </div>
                                </div>
                            </div>                               
                        )
                    })
                }
            </div>

            <ul className="pagination pagination">
                <li><a href="#"><i className="fa fa-chevron-left"></i></a></li>
                <li className="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a href="#"><i className="fa fa-chevron-right"></i></a></li>
            </ul>
        </>
    )
}
import React from "react";

class Accidents extends React.Component {
    constructor(props) {
        super(props);

        //오늘 날짜 YYYYMMDD 포맷으로 가져오기
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }

        this.state = {
            isLoding: true,
            data: [],
            error: null,
            date: yyyy + "" + mm + "" + dd,
        };
    }

    get_Data(api_key) {
        //현위치 가져오기 옵션
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        var x, y;
        navigator.geolocation.getCurrentPosition(
            //현위치 가져오기
            (position) => {
                //성공시
                x = position.coords.latitude; //x좌표
                y = position.coords.longitude; //y좌표
                console.log(x);
                console.log(y);
                this.setState({
                    Xpos: x,
                    Ypos: y
                });

                const Data_url = `https://openapi.its.go.kr:9443/eventInfo?apiKey=${api_key}&type=all&eventType=all&minX=${y-0.15}&maxX=${y+0.15}&minY=${x-0.15}&maxY=${x+0.15}&getType=json`;
                fetch(Data_url)
                    .then((res) => res.json())
                    .then((dt) => {
                        console.log(dt.body.items);
                        this.setState({
                            data: dt.body.items,
                            isLoding: false
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            error,
                            isLoding: false
                        });
                    });
            },
            (err) => {
                //실패시
                console.log(err);
            },
            options //옵션
        );
    }

    componentDidMount() {
        const API_KEY = "15287abb399744cfb37201af787b9505"; //실시간 교통 정보 API 키
        this.get_Data(API_KEY);
    }

    render() {
        const {
            isLoding,
            data,
            error,
        } = this.state;
        return (
            <>
                {isLoding ? (
                    <p>Loding...</p>
                ) : (
                    <div className="accident-container">
                        <div className="accident-title">
                            <img src="/img/wheel.svg"></img>
                            <p>내 주변 교통상황</p>
                        </div>
                        <p className="accident-ment">내 주변의 실시간 교통상황을 조회할 수 있습니다.</p>
                        <div className="accident-wrap">
                            {
                                data.map((item) => (
                                    <p className="accident-item">{item.roadName+' '+item.roadDrcType+' '+item.eventType+(item.lanesBlocked==''?'':', '+item.lanesBlocked)}</p>
                                ))
                            }
                        </div>
                    </div>
                )}
            </>
        );
    }
}

export default Accidents;
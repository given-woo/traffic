import React from "react";

class Weather extends React.Component {
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
            weather: [],
            error: null,
            date: yyyy + "" + mm + "" + dd,
        };
    }

    get_Data(api_key) {
        //geolocation 가져오기 옵션
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
                this.setState({ Xpos: x, Ypos: y }); //state의 Xpos, Ypos에 좌표 저장

                const Weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&lang=kr&appid=${api_key}`;
                fetch(Weather_url) //날씨 가져오기
                    .then((res) => res.json()) //string을 json으로 변환
                    .then((dt) => {
                        console.log(dt.weather[0].main);
                        var img='/img/sun.png';
                        if(dt.weather[0].main == 'Rain')
                            img='/img/rain.png';
                        else if(dt.weather[0].main == 'Clouds')
                            img='/img/cloud.png';
                        else if(dt.weather[0].main == 'Extreme')
                            img='/img/thunder.png';

                        this.setState({
                            weather: dt.weather[0].description,
                            weather_icon: img,
                            isLoding: false,
                        });
                    })
                    .catch(
                        (error) =>
                            this.setState({ error, isLoding: false }) //에러시
                    );
            },
            (err) => {
                //실패시
                console.log(err);
            },
            options //geolocation 옵션
        );
    }

    componentDidMount() {
        const API_KEY = "8261d63e7711941e935778944e0371d3"; //날씨 API 키
        this.get_Data(API_KEY);
    }

    render () {
        const {
            isLoding,
            error,
            weather,
            weather_icon,
        } = this.state;

        return (
            <>
                {isLoding ? (
                    <div className="weather-container loading">
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                ) : (
                    <div className="weather-container">
                        <img src={weather_icon}/>
                        <img src={weather_icon} className="shadow"/>
                        <p className="weather">현재 날씨 - {weather}</p>
                        <a className="weather-more" href="https://weather.com/">일기예보 더보기</a>
                    </div>
                )}
            </>
        )
    }
}

export default Weather;
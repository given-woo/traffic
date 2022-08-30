import React from 'react';

class Risk extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isLoading: true,
        }
    }
    componentDidMount () {
        const url="https://bd2a5e1b-7490-4101-93f4-ef615166a924.mock.pstmn.io/list";
        fetch(url)
            .then((res) => res.json())
            .then((dt) => {
                var Risk="매우낮음";
                if(dt[0].warning == 2)
                    Risk="낮음";
                else if(dt[0].warning == 3)
                    Risk="보통";
                else if(dt[0].warning == 4)
                    Risk="높음";
                else if(dt[0].warning == 5)
                    Risk="매우 높음";
                this.setState({
                    isLoading: false,
                    risk: Risk,
                    color: dt[0].warning,
                })
            });
    }
    render () {
        const {
            isLoading,
            risk,
            color
        } = this.state;
        return(
            <>
                {isLoading ? (
                    <div className="risk-container loading">
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                ) : (
                    <div className="risk-container">
                        <p className="risk-small">AI가 분석한 오늘의 교통</p>
                        <p>오늘은 사고가<br></br> 발생할 확률이<br></br> <span className={`color${color}`}>"{risk}"</span> 인 날이에요</p>
                    </div>
                )}
            </>
        );
    }
}

export default Risk;
import { Card } from 'primereact/card';

const MonthlyCard = ({ isMonthlySelected, chooseMonthlyPlan }) => {
    const monthlyHeader = (
        <img alt="Card" src="https://i.imgur.com/mBSHlYk.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    return (
        <div>
            <Card title="Basic / Monthly" subTitle="$4.99 / month" header={monthlyHeader} 
            className={isMonthlySelected ? 'card-selected' : ''} onClick={chooseMonthlyPlan} 
            style={{ width: "325px", marginBottom: "0.5rem", borderRadius: "15px" }}
            >
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}

export default MonthlyCard;
import { Card } from 'primereact/card';

const AnnualCard = ({ isAnnuallySelected, chooseAnnualPlan }) => {
    const annuallyHeader = (
        <img alt="Card" src="https://i.imgur.com/p17D7ca.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    return (
        <div>
            <Card title="Premium / Annually" subTitle="$49.99 / year" header={annuallyHeader} 
            className={isAnnuallySelected ? 'card-selected' : ''} onClick={chooseAnnualPlan} 
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

export default AnnualCard;
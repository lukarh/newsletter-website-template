import { Card } from 'primereact/card';

const BiannualCard = ({ isBiannuallySelected, chooseBiannualPlan }) => {
    const biannuallyHeader = (
        <img alt="Card" src="https://i.imgur.com/tlZiCfS.png"
         style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />
    )

    return (
        <div>
            <Card title="Pro / Bi-Annually" subTitle="$26.99 / 6 months" header={biannuallyHeader} 
            className={isBiannuallySelected ? 'card-selected' : ''} onClick={chooseBiannualPlan} 
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

export default BiannualCard;
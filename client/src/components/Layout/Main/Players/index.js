import React from 'react'
import { Card } from "antd"
import { Link } from "react-router-dom"

const players = [
    {
        cin: "07896875",
        firstName: "foulen",
        lastName: "benfoulen",
        tel: "+21653695",
        mail: 'foulen@gmail.com',
        poids: 80,
        longueur: 1.80,
        adresse: 'cite ben foulen',
        club_id: "farachet"
    },
    {
        cin: "07896875",
        firstName: "foulen",
        lastName: "benfoulen",
        tel: "+21653695",
        mail: 'foulen@gmail.com',
        poids: 80,
        longueur: 1.80,
        adresse: 'cite ben foulen',
        club_id: "farachet"
    },
    {
        cin: "07896875",
        firstName: "foulen",
        lastName: "benfoulen",
        tel: "+21653695",
        mail: 'foulen@gmail.com',
        poids: 80,
        longueur: 1.80,
        adresse: 'cite ben foulen',
        club_id: "farachet"
    },
    {
        cin: "07896875",
        firstName: "foulen",
        lastName: "benfoulen",
        tel: "+21653695",
        mail: 'foulen@gmail.com',
        poids: 80,
        longueur: 1.80,
        adresse: 'cite ben foulen',
        club_id: "farachet"
    },
    {
        cin: "07896875",
        firstName: "foulen",
        lastName: "benfoulen",
        tel: "+21653695",
        mail: 'foulen@gmail.com',
        poids: 80,
        longueur: 1.80,
        adresse: 'cite ben foulen',
        club_id: "farachet"
    }
]
const Players = () => {
    const { Meta } = Card;
    return (
        <div>
            <h1>Players</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>{players.map((e, i) =>

                <Link to="/players/profile" style={{ margin: "25px" }} key={i}><Card

                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3N28G-qzP_j4mhEhTqxz3NXUI431XIOsAUrvIc0AL_1kHhxS4&s" />}
                >
                    <Meta title={e.firstName + e.lastName} description={e.mail} />
                </Card>
                </Link>)}
            </div>

        </div >
    )
}

export default Players

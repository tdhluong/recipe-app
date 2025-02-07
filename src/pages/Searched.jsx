import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {Link, useParams} from "react-router-dom";

function Searched() {

    const [searchedRecipes, setsearchedRecipes] = useState([]);
    let params = useParams();

    const getSearched =  async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=9`);
        const recipes = await data.json();
        setsearchedRecipes(recipes.results);
    };

    useEffect(() => {
        getSearched(params.search);
    },[params.search]);

    return (
        <Grid>
            {searchedRecipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                );               
            })}
        </Grid>
    );
}

const Grid = styled.div`
    margin-top: 3rem;
    margin-bottom: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    grid-gap: 1rem;
`;

const Card = styled.div`
    img {
        width:100%;
        border-radius:1rem;
    }
    a {
        text-decoration: none;
        
    }
    h4 {
        text-align: center;
        padding: 1rem;
        font-size: 0.7rem;
    }
`;

export default Searched;
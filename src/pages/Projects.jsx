import { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import List from '../components/List';
import PropTypes from 'prop-types';
import styled from 'styled-components';

Projects.propTypes = {
    userName: PropTypes.string.isRequired,
};

const StyledProjectsContainer = styled.div `
  text-align: center;
  margin-left: 60px;
  margin-right: 60px;
  margin-bottom: 20vh;
`;

//Referenced Custom Icon CSS Button Hover
//https://www.sliderrevolution.com/resources/css-button-hover-effects/
const StyledNavLink = styled(NavLink)`
  transition: all 0.5s;
  cursor: pointer;
  position: relative;

  &:after {
    content: '»';
    position: absolute;
    opacity: 0;
    right: -25px;
    transition: 0.5s;
  }

  &:hover {
    padding-right: 25px;

    &:after {
      opacity: 1;
      right: 10px;
    }
  }
`;

function Projects(props) {
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(
                `https://api.github.com/users/${props.userName}/repos`,
            );
            const result = await data.json();

            if (result) {
                setProjects(result);
                setLoading(false);
            }
        }

        fetchData();
    }, [props.userName]);

    return (
        <StyledProjectsContainer>
            <h2>Here are a few things I&apos;ve worked on.</h2>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <List
                    items={projects.map((project) => ({
                        field: project.name,
                        value: (
                            <StyledNavLink to={`/projects/${project.name}`}>
                                Open project
                            </StyledNavLink>
                        ),
                    }))}
                />
            )}
        </StyledProjectsContainer>
    );
}

export default Projects;

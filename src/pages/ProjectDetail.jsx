import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-left: 10%;
  margin-right: 10%;
`;

const StyledImage = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: auto;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
  @media (max-width: 900px) {
    width: 90%;
    margin: 10%;
  }
`;

const ProjectDescription = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
`;

//Referenced from D. button and link styling - 01. Rising up by
// https://blog.avada.io/css/link-styles
const StyledButton = styled.a`
  font-weight: bold;
  background-color: transparent;
  border: solid 4px #242222;
  color: #242222;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  padding: 12px 28px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-top: 20px;

  &:hover,
  &:focus {
    background-color: #242222;
    border-color: #242222;
    color: #f7f7f0;
    transform: translateY(-4px);
    box-shadow: 4px 4px 0 rgba(3, 4, 3, 0.2);
  }

  &:active {
    transform: translateY(0px);
    box-shadow: 0 0 0 rgba(3, 4, 3, 0.15);
  }
`;

Project.propTypes = {
    userName: PropTypes.string.isRequired,
};

function Project(props) {
    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState({});
    const [pngFiles, setPngFiles] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const projectData = await fetch(`https://api.github.com/repos/${props.userName}/${name}`);
            const projectResult = await projectData.json();

            if (projectResult) {
                setProject(projectResult);

                const contentsData = await fetch(projectResult.contents_url.replace('{+path}', ''));
                const contentsResult = await contentsData.json();

                const pngFiles = contentsResult.filter((file) => file.name.toLowerCase().endsWith('.png'));
                setPngFiles(pngFiles);

                setLoading(false);
            }
        }

        if (props.userName && name) {
            fetchData();
        }
    }, [props.userName, name]);

    return (
        <ProjectContainer>
            <h2>Project: {project.name}</h2>
            {loading ? <span>Loading...</span> : null}
            {pngFiles.length > 0 && (
                <StyledImage>
                    {pngFiles.map((pngFile) => (
                        <img key={pngFile.name} src={pngFile.download_url} alt={pngFile.name} />
                    ))}
                </StyledImage>
            )}
            <ProjectDescription>{project.description}</ProjectDescription>
            <StyledButton href={project.html_url}>
                View Project »
            </StyledButton>
        </ProjectContainer>
    );
}

export default Project;

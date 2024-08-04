import { useState, useEffect } from 'react';
import Link from '../components/Link';
import List from '../components/List';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledProfileContainer = styled.div`
    text-align: center;
    color: #f7f7f0;
    margin: 25vh 10% 40vh;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const StyledBio = styled.h2`
  font-size: calc(20px + 2vw);
  font-weight: normal;
  margin-bottom: 50vh;
`;

Profile.propTypes = {
    userName: PropTypes.string.isRequired,
};

export default function Profile({ userName }) {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});

    const items = [
        {
            field: 'html_url',
            value: <Link url={profile.html_url} title={profile.html_url} />,
        },
        {
            field: 'repos_url',
            value: <Link url={profile.repos_url} title={profile.repos_url} />,
        },
        { field: 'name', value: profile.name },
        { field: 'company', value: profile.company },
        { field: 'location', value: profile.location },
        { field: 'email', value: profile.email },
    ];

    useEffect(() => {
        async function fetchData() {
            const profile = await fetch(`https://api.github.com/users/${userName}`);
            const result = await profile.json();

            if (result) {
                setProfile(result);
                setLoading(false);
            }
        }

        fetchData();
    }, [userName]);

    return (
        <StyledProfileContainer>
            <h2>About me</h2>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    <StyledImage
                        src={profile.avatar_url}
                        alt={profile.name}
                    />
                    <StyledBio>{profile.bio}</StyledBio>
                    <h2>Some more details.</h2>
                    <List items={items} />
                </div>
            )}
        </StyledProfileContainer>
    );
}

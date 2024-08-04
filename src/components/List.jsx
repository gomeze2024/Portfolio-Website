import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
    font-size:  calc(15px + 0.5vw);
`;

const ListItem = styled.li`
    margin-bottom: 10px;
`;

const FieldLabel = styled.span`
    font-weight: bold;
`;

function List(props) {
    return (
        <ListContainer>
            {props.items.map((item) => (
                <ListItem key={item.field}>
                    <FieldLabel>{item.field}:</FieldLabel> {item.value}
                </ListItem>
            ))}
        </ListContainer>
    );
}

export default List;
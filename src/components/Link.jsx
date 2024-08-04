function Link(props) {
    return (
        <a
            href={props.url}
            target='_blank'
            rel='noopener noreferrer'
        >
            {props.title}
        </a>
    );
}

export default Link;

const Title = ({ counter }) => {
  const isCounter = counter
    ? `${counter}번째 고양이 가라사대`
    : "고양이 가라사대";
  return <h1>{isCounter}</h1>;
};

export default Title;

function Favorites({ favorites, CatItem }) {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 고양이 사진을 저장해보세요!</div>;
  }
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}

export default Favorites;

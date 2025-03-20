import { Fragment, useState } from "react";
import Sliders from "../../components/sliders/sliders";
import Search from "../../components/search/search";
import "./styles.scss";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Fragment>
      <div className="div-search">
        <i
          className="fa fa-search search-icon"
          onClick={() => setShowModal(!showModal)}
        />
      </div>
      <Sliders />
      {showModal && <Search setShowModal={setShowModal} />}
    </Fragment>
  );
};

export default Home;

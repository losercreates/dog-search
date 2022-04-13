import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { GiSittingDog } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import { IconContext } from "react-icons";

const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [dogs, setdogs] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("http://localhost:8080/api/dogs");
      setdogs(req.data);
    }
    fetchData();
  }, []);

  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <IconContext.Provider value={{ color: "yellow", size: "60px" }}>
          <div>
            <GiSittingDog />
          </div>
        </IconContext.Provider>
        <h1>DogSearch</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className={styles.search_container}>
        <div className={styles.inner_search_container}>
          <IconContext.Provider value={{ color: "gray", size: "30px" }}>
            <div>
              <AiOutlineSearch />
            </div>
          </IconContext.Provider>
          <input
            placeholder="Enter Dog Name"
            onChange={(event) => setQuery(event.target.value)}
            className={styles.search_bar}
          />
        </div>
      </div>
      <div className={styles.search_results}>
        {dogs
          .filter((dog) => {
            if (query === "") {
              return;
            } else if (dog.name.toLowerCase().includes(query.toLowerCase())) {
              return dog;
            }
          })
          .map((dog) => (
            <div key={dog.id} className={styles.card}>
              <div className={styles.img_container}>
                <img src={dog.images[0]} alt="" />
              </div>
              <h2>{dog.name.charAt(0).toUpperCase() + dog.name.slice(1)}</h2>
              <p>{dog.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Main;

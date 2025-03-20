/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { Category, Actor, IMovie } from "../../interfaces/IMovies";
import ReactSelect from "react-select";
import "./styles.scss";

interface SearchProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ setShowModal }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<any | null>(
        null
    );
    const [selectedActor, setSelectedActor] = useState<any | null>(null);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchMovies = async () => {
        const apiUrl = process.env.REACT_APP_API_URL;
        setLoading(true);
        const categoryId = selectedCategory?.categoryId;
        const actorId = selectedActor?.actorId;

        let url = `${apiUrl}/movies`;

        const params = [];

        if (actorId) {
            params.push(`actor=${actorId}`);
        }

        if (categoryId) {
            params.push(`category=${categoryId}`);
        }

        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        console.log(url);

        try {
            const response: any = await axios.get(url);
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [selectedActor, selectedCategory]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const getAllCategories = async () => {
            const response: any = await axios.get(`${apiUrl}/categories`);
            const arrayList = [
                { categoryId: 0, categoryName: 'Todas' },
                ...response?.data
            ];
            setCategories(arrayList);
        };

        const getAllActors = async () => {
            const response: any = await axios.get(`${apiUrl}/actors`);
            const arrayList = [
                { actorId: 0, actorName: 'Todos' },
                ...response?.data
            ];
            setActors(arrayList);
        };

        getAllCategories();
        getAllActors();
    }, []);

    return (
        <div className="modal">
            <div className="overlay">
                <div className="close-btn-modal" onClick={() => setShowModal(false)}>
                    <i className="fa fa-times"></i>
                </div>
            </div>
            <div className="content">
                {!!categories?.length && !!actors?.length &&
                    <div className="filters">
                        <ReactSelect
                            options={categories.map((category) => ({
                                value: category.categoryId,
                                label: category.categoryName,
                            }))}
                            value={selectedCategory ? { value: selectedCategory.categoryId, label: selectedCategory.categoryName } : null}
                            onChange={(selectedOption) => setSelectedCategory(categories.find((category) => category.categoryId === selectedOption?.value))}
                            placeholder="Select Category"
                            className="select-custom"
                        />
                        <ReactSelect
                            options={actors.map((actor) => ({
                                value: actor.actorId,
                                label: actor.actorName,
                            }))}
                            value={selectedActor ? { value: selectedActor.actorId, label: selectedActor.actorName } : null}
                            onChange={(selectedOption) => setSelectedActor(actors.find((actor) => actor.actorId === selectedOption?.value))}
                            placeholder="Select Actor"
                        />
                    </div>
                }

                {loading ? (
                    <div className={"loading"}>Loading...</div>
                ) : (
                    <div className="results">
                        {movies?.length ? (
                            movies.map((movie) => (
                                <div key={movie.movieId} className="movie">
                                    <img src={movie.movieImage} alt={movie.movieTitle} />
                                    <p>{movie.movieTitle}</p>
                                </div>
                            ))
                        ) : (
                            <p>No movies found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

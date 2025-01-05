// Header component for movies & series display section
import Search from "./Search";
import backArrow from "../assets/images/back-arrow.png"

const ContentHeader = () => {
    const navElement = document.getElementsByClassName('nav')[0];
    const contentElement = document.getElementsByClassName('content')[0];

    const goBack = () => {
        if (contentElement.classList.contains('active')) {
            contentElement.classList.remove('active');
        }
        if (!navElement.classList.contains('active')) {
            navElement.classList.add('active');
        }
    }

    return (
        <div className="movie-list-header">
            <div className="back-arrow-content">
                <img src={backArrow} alt='back'className='back-arrow-icon' onClick={goBack}/>
            </div>
            <div className="search-content">
                <Search />
            </div>
        </div>
    )
}

export default ContentHeader;
//  Components
import { Container } from "../../components/Container";
import { Paragraph } from "../../components/Paragraph";
import { Title } from "../../components/Title";

export const About = () => {
    return (
        <Container>
            <div className="h-screen">
                <div className="w-3/4 mx-auto">
                    <Title>About NextDish...</Title>
                    <Paragraph>This is a web app where you can discover new recipes and find your next favorite dish through a varied set of categories or making use of the search feature.</Paragraph>
                    <Paragraph>You can save your favorite dishes to your favorites, linked to your own account (not submitted or sent anywhere, it's just stored on your browser).</Paragraph>
                    <Paragraph>Built with React, using Redux Toolkit, Redux Persist, React Router, DaisyUI and Tailwind for styling.</Paragraph>
                    <Paragraph>- Developed by <a className="underline text-neutral" href="https://github.com/melinamontelongo">Melina M.</a></Paragraph>
                </div>
            </div>
        </Container>
    )
};
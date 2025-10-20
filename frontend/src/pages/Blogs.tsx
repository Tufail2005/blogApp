import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Appbar />

      <div className="flex justify-center">
        <div className="max-w-xl">
          <BlogCard
            authorName={"Tufail Ahmed"}
            title={
              "The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing"
            }
            content={
              "Speculation rules the world. It didn’t used to. But from the 1980s through to 2008, something changed. Investors realised that they could get far more return from hype than from any kind of legitimate business. This is the information age, after all, and information is easy to manipulate and commodify. This led to the dot-com bubble, the 2008 credit crunch, the 2016–2017 cryptocurrency bubble, the late 2020–2021 cryptocurrency bubble, and the 2022 NFT bubble, with the latest fad being the AI bubble. In fact, nearly half of the world’s private investment is being funnelled into AI, and AI speculation is the main driving force behind the S&P 500’s recent growth. But, just as the others did before their catastrophic failure, the AI bubble is showing signs of imminent bursting."
            }
            publisedDate={"20th Oct 2025"}
          />

          <BlogCard
            authorName={"Tufail Ahmed"}
            title={
              "The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing"
            }
            content={
              "Speculation rules the world. It didn’t used to. But from the 1980s through to 2008, something changed. Investors realised that they could get far more return from hype than from any kind of legitimate business. This is the information age, after all, and information is easy to manipulate and commodify. This led to the dot-com bubble, the 2008 credit crunch, the 2016–2017 cryptocurrency bubble, the late 2020–2021 cryptocurrency bubble, and the 2022 NFT bubble, with the latest fad being the AI bubble. In fact, nearly half of the world’s private investment is being funnelled into AI, and AI speculation is the main driving force behind the S&P 500’s recent growth. But, just as the others did before their catastrophic failure, the AI bubble is showing signs of imminent bursting."
            }
            publisedDate={"20th Oct 2025"}
          />

          <BlogCard
            authorName={"Tufail Ahmed"}
            title={
              "The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing"
            }
            content={
              "Speculation rules the world. It didn’t used to. But from the 1980s through to 2008, something changed. Investors realised that they could get far more return from hype than from any kind of legitimate business. This is the information age, after all, and information is easy to manipulate and commodify. This led to the dot-com bubble, the 2008 credit crunch, the 2016–2017 cryptocurrency bubble, the late 2020–2021 cryptocurrency bubble, and the 2022 NFT bubble, with the latest fad being the AI bubble. In fact, nearly half of the world’s private investment is being funnelled into AI, and AI speculation is the main driving force behind the S&P 500’s recent growth. But, just as the others did before their catastrophic failure, the AI bubble is showing signs of imminent bursting."
            }
            publisedDate={"20th Oct 2025"}
          />

          <BlogCard
            authorName={"Tufail Ahmed"}
            title={
              "The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing"
            }
            content={
              "Speculation rules the world. It didn’t used to. But from the 1980s through to 2008, something changed. Investors realised that they could get far more return from hype than from any kind of legitimate business. This is the information age, after all, and information is easy to manipulate and commodify. This led to the dot-com bubble, the 2008 credit crunch, the 2016–2017 cryptocurrency bubble, the late 2020–2021 cryptocurrency bubble, and the 2022 NFT bubble, with the latest fad being the AI bubble. In fact, nearly half of the world’s private investment is being funnelled into AI, and AI speculation is the main driving force behind the S&P 500’s recent growth. But, just as the others did before their catastrophic failure, the AI bubble is showing signs of imminent bursting."
            }
            publisedDate={"20th Oct 2025"}
          />
        </div>
      </div>
    </div>
  );
};

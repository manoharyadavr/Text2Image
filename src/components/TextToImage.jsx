// import React, { useState } from "react";
// import axios from "axios";
// import "./TextToImage.css";
// import sampleImage from "./welcome-message.jpg";

// const TextToImage = () => {
//   const [inputText, setInputText] = useState("");
//   const [imageURL, setImageURL] = useState("");

//   const handleTextChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleGenerateImage = async () => {
//     try {
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
//         {
//           inputs: inputText,
//         },
//         {
//           headers: {
//             Authorization: "Bearer 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",
//           },
//           responseType: "arraybuffer", // Ensure response is treated as an array buffer
//         }
//       );

//       const base64String = btoa(
//         new Uint8Array(response.data).reduce(
//           (data, byte) => data + String.fromCharCode(byte),
//           ""
//         )
//       );

//       const generatedImageURL = `data:image/jpeg;base64,${base64String}`;
//       setImageURL(generatedImageURL);
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>
//         Text 2 <span>Image</span> Generator
//       </h1>
//       <div className="generated-image">
//         {imageURL ? (
//           <div className="image-generated">
//             <h2>Generated Image</h2>
//             <img src={imageURL} alt="Generated" />
//           </div>
//         ) : (
//           <div className="sample-image">
//             <h2>Sample Image</h2>
//             <img src={sampleImage} alt="Sample" />
//           </div>
//         )}
//       </div>
//       <div className="user-prompt">
//         <input
//           placeholder="What's on your Mind ?"
//           value={inputText}
//           onChange={handleTextChange}
//           id="user-input"
//         />
//         <button id="generate-btn" onClick={handleGenerateImage}>
//           Generate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TextToImage;

import React, { useState } from "react";
import axios from "axios";
import "./TextToImage.css";
import sampleImage from "./welcome-message.jpg";

const TextToImage = () => {
  const [inputText, setInputText] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading indicator

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true); // Set loading to true when starting the request

      const response = await axios.post(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          inputs: inputText,
        },
        {
          headers: {
            Authorization: "Bearer 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",
          },
          responseType: "arraybuffer",
        }
      );

      const base64String = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const generatedImageURL = `data:image/jpeg;base64,${base64String}`;
      setImageURL(generatedImageURL);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is completed (whether successful or not)
    }
  };

  return (
    <div className="container">
      <h1>
        Text 2 <span>Image</span> Generator
      </h1>
      <div className="generated-image">
        {imageURL ? (
            <div className="image-generated">
            <h2>Generated Image</h2>
            {loading && (
              <div className="loading-bar">
                {/* Insert your progress bar or loading spinner here */}
                Loading...
              </div>
            )}
            <img src={imageURL} alt="Generated" />
          </div>
        ) : (
            <div className="sample-image">
            <h2>Sample Image</h2>
            <img src={sampleImage} alt="Sample" />
          </div>
        )}
      </div>
      <div className="user-prompt">
        <input
          placeholder="What's on your Mind?"
          value={inputText}
          onChange={handleTextChange}
          id="user-input"
        />
        <button id="generate-btn" onClick={handleGenerateImage}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default TextToImage;

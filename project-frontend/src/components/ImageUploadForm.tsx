import { useState, useActionState } from "react";

interface ImageUploadFormProps {
    authToken: string;
}

export function ImageUploadForm(props: ImageUploadFormProps) {
    const [dataUrl, setDataUrl] = useState("");

    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: FormData) => {
            const image = formData.get("image");
            const name = formData.get("name");

            console.log(`image: ${image}`);
            console.log(`name: ${name}`);

            if (!name || !image) {
                return {
                    type: "error",
                    message: `Please input both name and image`,
                };
            }

            try {
                const response = await fetch("/api/images", {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${props.authToken}`,
                    }
                });
                if (!response.ok) {
                    // Handle HTTP 400 bad upload, HTTP 401 Unauthorized, etc...
                    return {
                        type: "error",
                        message: `Client error`,
                    };
                }
                return {
                    type: "success",
                    message: `Successfully uploaded image!`,
                };
            } catch (error) { // Network error
                console.error(error);
                // Return an error message...
                return {
                    type: "error",
                    message: `Something went wrong`,
                };
            }

            // console.log(`submitResult: ${submitResult}`);

            // return response;
        },
        null
    );

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const fileObj = e.target.files[0];
            try {
                const url = await readAsDataURL(fileObj);
                if (typeof url === "string") {
                    setDataUrl(url);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    function readAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    return (
        <form action={submitAction}>
            <div>
                <label>
                    Choose image to upload: 
                    <input
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        onChange={handleImageUpload}
                    />
                </label>
            </div>
            
            <div>
                <label>
                    <span>Image title: </span>
                    <input name="name" />
                </label>
            </div>

            <div> {/* Preview img element */}
                <img style={{maxWidth: "20em"}} src={dataUrl} alt="" />
            </div>

            {result && (
                <p style={{ color: result.type === "error" ? 'red' : 'black' }}>
                    {result.message}
                </p>
            )}
            <button disabled={isPending}>Confirm upload</button>
        </form>
    );
}

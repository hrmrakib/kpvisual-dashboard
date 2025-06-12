"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Youtube, ExternalLink, X } from "lucide-react";
import IssueCard from "@/components/share/RichCard";
import Image from "next/image";

export default function EditFrequment({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("Start Of The Season");
  const [description, setDescription] = useState(
    "Getting Your Swimming Pool Ready At The Start Of The Season Involves A Few Key Steps To Ensure It's Clean, Safe, And Ready For Swimming."
  );
  const [websiteUrl, setWebsiteUrl] = useState("https://www.Bing.com");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the data based on the ID
    // This is just a placeholder
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    // In a real app, you would save the changes to a database
    router.push("/");
  };

  return (
    <div className='bg-black flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl bg-zinc-800 rounded-lg overflow-hidden'>
        <div className='p-4 flex items-center justify-between'>
          <button
            onClick={() => router.back()}
            className='text-white flex items-center hover:text-gray-300 transition-colors'
          >
            <ArrowLeft size={20} className='mr-2' />
            <span>Edit Frequment</span>
          </button>

          <button
            onClick={handleSubmit}
            className='bg-cyan-400 hover:bg-cyan-500 text-black font-medium px-6 py-2 rounded-full transition-colors'
          >
            Update
          </button>
        </div>

        <div className='px-4 pb-6 space-y-4'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-3 bg-zinc-700 border border-zinc-600 rounded text-white'
          />

          {imagePreview ? (
            <div className='relative flex justify-center py-4'>
              <Image
                src={imagePreview}
                alt={title}
                width={90}
                height={90}
                className='object-contain'
              />

              <div>
                <X
                  onClick={() => setImagePreview(null)}
                  className='absolute top-0 right-0 text-white hover:text-gray-300 transition-colors'
                />
              </div>
            </div>
          ) : (
            <div className='flex justify-center py-4'>
              <Image
                src='/issue/1.png'
                alt={title}
                width={90}
                height={90}
                className='object-contain'
              />
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            className='w-full p-2 text-white bg-zinc-700 rounded border border-zinc-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-400 file:text-black hover:file:bg-cyan-500'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className='w-full p-3 bg-zinc-700 border border-zinc-600 rounded text-white resize-none'
          />

          <div className='flex flex-wrap gap-2'>
            <div className='flex items-center bg-zinc-700 rounded overflow-hidden'>
              <button className='p-2 bg-zinc-700 text-white'>
                <Youtube size={20} />
              </button>
              <input
                type='text'
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder='YouTube URL'
                className='p-2 bg-zinc-700 border-none text-white text-sm flex-1 min-w-0'
              />
            </div>

            <div className='flex items-center bg-zinc-700 rounded overflow-hidden flex-1'>
              <input
                type='text'
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className='p-2 bg-zinc-700 border-none text-white text-sm flex-1 min-w-0'
              />
              <button className='p-2 bg-zinc-700 text-white'>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

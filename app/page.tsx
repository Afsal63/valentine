"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { motion } from "framer-motion"

export default function LoveHome() {
  const [name, setName] = useState("")
  const [link, setLink] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (name) {
      const origin = window.location.origin
      setLink(`${origin}/love/${encodeURIComponent(name)}`)
    } else {
      setLink("")
    }
  }, [name])

  const copyLink = async () => {
    if (!link) return
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openLink = () => {
    if (!link) return
    router.push(`/love/${encodeURIComponent(name)}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-600 via-rose-500 to-purple-700">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/15 backdrop-blur-2xl p-8 rounded-3xl max-w-md w-full text-center text-white shadow-[0_0_50px_rgba(255,0,120,0.4)]"
      >
        <h1 className="text-3xl font-extrabold mb-4">
          💘 Valentine Link Generator
        </h1>

        <p className="text-pink-100 mb-6">
          Enter HIS / HER name and send her the link 😈
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Her name ❤️"
          className="w-full px-5 py-3 rounded-full text-black outline-none mb-4"
        />

        {/* Generated Link */}
        {link && (
          <div className="bg-black/20 rounded-xl px-4 py-3 mb-4 break-all text-sm">
            {link}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyLink}
            disabled={!link}
            className="w-full py-3 rounded-full font-bold
            bg-gradient-to-r from-pink-500 to-red-500 disabled:opacity-50"
          >
            {copied ? "Copied 💖" : "Copy Link 🔗"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openLink}
            disabled={!link}
            className="w-full py-3 rounded-full font-bold
            bg-white/20 hover:bg-white/30 disabled:opacity-50"
          >
            Open 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
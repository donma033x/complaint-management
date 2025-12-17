"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mutate } from "swr"

interface AddCategoryDialogProps {
  open: boolean
  onClose: () => void
  onCategoryAdded?: (categoryId: string) => void
}

export function AddCategoryDialog({ open, onClose, onCategoryAdded }: AddCategoryDialogProps) {
  const [name, setName] = useState("")
  const [icon, setIcon] = useState("📁")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon }),
      })

      if (response.ok) {
        const data = await response.json()
        mutate("/api/categories")
        onClose()
        setName("")
        setIcon("📁")

        // Notify parent component with the new category ID
        if (onCategoryAdded && data.category?.id) {
          onCategoryAdded(data.category.id)
        }
      }
    } catch (err) {
      console.error("Failed to add category:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>添加新类别</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">类别名称</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：虚假新闻"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">图标 (Emoji)</Label>
            <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="📁" maxLength={2} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "保存中..." : "保存"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

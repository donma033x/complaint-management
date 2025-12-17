"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mutate } from "swr"

interface Category {
  id: string
  name: string
  icon: string
}

interface EditCategoryDialogProps {
  category: Category
  open: boolean
  onClose: () => void
}

export function EditCategoryDialog({ category, open, onClose }: EditCategoryDialogProps) {
  const [name, setName] = useState(category.name)
  const [icon, setIcon] = useState(category.icon)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, icon }),
      })

      if (response.ok) {
        mutate("/api/categories")
        onClose()
      }
    } catch (err) {
      console.error("Failed to update category:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>重命名类别</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">类别名称</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">图标 (Emoji)</Label>
            <Input id="icon" value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={2} />
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

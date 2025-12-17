"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mutate } from "swr"

interface EditComplaintDialogProps {
  complaint: {
    categoryId: string
    complaintId: string
    content: string
  }
  open: boolean
  onClose: () => void
}

export function EditComplaintDialog({ complaint, open, onClose }: EditComplaintDialogProps) {
  const [content, setContent] = useState(complaint.content)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/complaints/${complaint.complaintId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })

      if (response.ok) {
        mutate(`/api/complaints?categoryId=${complaint.categoryId}`)
        onClose()
      }
    } catch (err) {
      console.error("Failed to update complaint:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>编辑投诉词</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content">投诉词内容</Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} required />
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

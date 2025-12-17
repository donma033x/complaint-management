// In production, replace with actual database (Supabase, Neon, etc.)

interface Category {
  id: string
  name: string
  icon: string
  createdAt: number
}

interface Complaint {
  id: string
  categoryId: string
  content: string
  usageCount: number
  createdAt: number
  updatedAt: number
  lastUsedAt?: number  // 上次统计的时间，用于1分钟内去重
}

let categories: Category[] = [
  { id: "1", name: "虚假新闻", icon: "📰", createdAt: Date.now() },
  { id: "2", name: "侮辱诽谤", icon: "👤", createdAt: Date.now() },
  { id: "3", name: "色情低俗", icon: "⚠️", createdAt: Date.now() },
  { id: "4", name: "暴力血腥", icon: "💀", createdAt: Date.now() },
  { id: "5", name: "违法犯罪", icon: "⚖️", createdAt: Date.now() },
  { id: "6", name: "侵犯版权", icon: "©️", createdAt: Date.now() },
  { id: "7", name: "未成年保护", icon: "👶", createdAt: Date.now() },
  { id: "8", name: "煽动仇恨", icon: "🔥", createdAt: Date.now() },
  { id: "9", name: "网络诈骗", icon: "💰", createdAt: Date.now() },
  { id: "10", name: "危害国家安全", icon: "🛡️", createdAt: Date.now() },
]

let complaints: Complaint[] = [
  {
    id: "1",
    categoryId: "1",
    content:
      "该信息涉嫌发布虚假新闻内容，严重误导公众，违反《网络信息内容生态治理规定》第六条，扰乱网络信息传播秩序，请求贵平台依法核实并删除该虚假信息，追究发布者责任。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "2",
    categoryId: "1",
    content:
      "此内容为不实信息，与客观事实严重不符，已造成不良社会影响。根据《互联网信息服务管理办法》相关规定，散布虚假信息属于违法行为，特此投诉要求立即下架处理。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "3",
    categoryId: "1",
    content:
      "经核实，该新闻内容系编造虚构，无任何事实依据，已对相关单位和个人造成名誉损害。依据《民法典》第一千一百九十四条，请求平台删除虚假内容并公开更正。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 侮辱诽谤
  {
    id: "4",
    categoryId: "2",
    content:
      "该账号/内容公然发布侮辱、诽谤性言论，对特定对象进行人身攻击，严重侵害他人名誉权。根据《民法典》第一千零二十四条及《治安管理处罚法》第四十二条，请求删除侮辱内容并封禁账号。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "5",
    categoryId: "2",
    content:
      "此信息含有大量侮辱性、诽谤性语言，恶意抹黑相关主体，已构成网络暴力。依据《网络信息内容生态治理规定》，平台应当防范和抵制制作、复制、发布含有侮辱或者诽谤他人的不良信息。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "6",
    categoryId: "2",
    content:
      "该用户持续发布针对性诽谤言论，捏造事实损害他人名誉，情节恶劣。根据相关法律法规，请求平台立即删除侵权内容，永久封禁违规账号，并保留追究法律责任的权利。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 色情低俗
  {
    id: "7",
    categoryId: "3",
    content:
      "该内容包含色情、低俗信息，违反《网络信息内容生态治理规定》第六条关于禁止含有淫秽色情内容的规定，严重污染网络环境，请求立即删除并对发布者采取封禁措施。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "8",
    categoryId: "3",
    content:
      "此信息涉嫌传播淫秽色情内容，违反《互联网信息服务管理办法》及《刑法》第三百六十四条相关规定，对青少年身心健康造成严重危害，要求平台尽快处理。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "9",
    categoryId: "3",
    content:
      "该账号长期发布色情低俗内容，屡次违规，严重违反平台社区规范和国家法律法规。根据《未成年人保护法》等相关规定，请求永久封禁该账号并清理相关内容。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 暴力血腥
  {
    id: "10",
    categoryId: "4",
    content:
      "该内容展示暴力、血腥画面，可能引起观众不适，特别是对未成年人造成心理伤害。根据《网络信息内容生态治理规定》和《未成年人保护法》，请求删除此类不良信息。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "11",
    categoryId: "4",
    content:
      "此视频/图片包含极端暴力血腥内容，违反平台内容规范和社会公序良俗，可能引发模仿行为。依据相关管理规定，要求立即下架处理并追究发布者责任。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "12",
    categoryId: "4",
    content:
      "该信息涉嫌宣扬暴力、展示血腥场景，严重违反《网络信息内容生态治理规定》第六条第七款，对网络生态环境造成恶劣影响，请求彻底清除相关内容。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 违法犯罪
  {
    id: "13",
    categoryId: "5",
    content:
      "该内容涉嫌教唆、引诱他人实施违法犯罪活动，违反《刑法》相关条款及《网络信息内容生态治理规定》。为维护网络安全和社会稳定，请求立即删除。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "14",
    categoryId: "5",
    content:
      "此信息包含违法犯罪内容，可能涉及诈骗、贩毒、赌博等违法行为的宣传推广。根据《互联网信息服务管理办法》和《刑法》相关规定，要求平台配合调查处理。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "15",
    categoryId: "5",
    content:
      "该账号发布内容涉嫌组织、策划违法犯罪活动，性质严重。依据《网络安全法》第十二条和《刑法》相关条款,请求平台立即采取措施并保留相关证据。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 侵犯版权
  {
    id: "16",
    categoryId: "6",
    content:
      "该内容未经授权擅自使用他人享有著作权的作品，构成侵权行为。根据《著作权法》第四十八条和第五十二条，请求删除侵权内容并停止侵权行为，保留追究法律责任的权利。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "17",
    categoryId: "6",
    content:
      "此账号大量盗用原创作品，未署名原作者且用于商业用途，严重侵犯著作权人合法权益。依据《著作权法》相关规定，要求立即下架侵权内容并赔偿损失。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "18",
    categoryId: "6",
    content:
      "该用户发布的内容侵犯我方知识产权，包括但不限于文字、图片、视频等作品。现依法提出投诉，要求平台删除侵权内容，并提供侵权者信息以便进一步维权。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 未成年保护
  {
    id: "19",
    categoryId: "7",
    content:
      "该内容不适宜未成年人观看，可能对未成年人身心健康造成不良影响。根据《未成年人保护法》第五十二条和《网络信息内容生态治理规定》，请求对该内容进行年龄限制或删除处理。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "20",
    categoryId: "7",
    content:
      "此信息涉嫌侵害未成年人权益，包含可能诱导未成年人违法犯罪或身心受害的内容。依据《未成年人保护法》第七十二条，要求平台立即停止传输相关信息。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "21",
    categoryId: "7",
    content:
      "该账号针对未成年人传播不良信息，严重违反《未成年人保护法》和《网络信息内容生态治理规定》关于未成年人网络保护的规定，请求永久封禁。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 煽动仇恨
  {
    id: "22",
    categoryId: "8",
    content:
      "该内容涉嫌煽动民族仇恨、地域歧视，破坏民族团结，违反《宪法》和《刑法》第二百四十九条相关规定。此类言论危害国家统一和社会稳定，请求立即删除并追究法律责任。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "23",
    categoryId: "8",
    content:
      "此信息含有煽动性言论，故意制造群体对立、挑起社会矛盾，违反《网络信息内容生态治理规定》第六条。为维护社会和谐稳定，要求平台尽快处置相关内容和账号。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "24",
    categoryId: "8",
    content:
      "该用户长期发布煽动仇恨、歧视性言论,企图制造社会分裂和对立情绪。根据《治安管理处罚法》和《刑法》相关条款，请求封禁账号。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 网络诈骗
  {
    id: "25",
    categoryId: "9",
    content:
      "该内容涉嫌网络诈骗，通过虚构事实、隐瞒真相等方式骗取他人财物。根据《刑法》第二百六十六条和《反电信网络诈骗法》，请求立即删除诈骗信息。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "26",
    categoryId: "9",
    content:
      "此账号发布虚假信息实施网络诈骗活动，已有多人受骗。依据《反电信网络诈骗法》第四条和第三十一条，要求平台配合调查并提供相关数据。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "27",
    categoryId: "9",
    content:
      "该信息为典型的网络诈骗内容，采用刷单、投资理财等话术诱骗受害者。根据《反电信网络诈骗法》和平台安全责任，请求紧急冻结账号、删除内容。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },

  // 危害国家安全
  {
    id: "28",
    categoryId: "10",
    content:
      "该内容涉嫌危害国家安全、泄露国家秘密，违反《国家安全法》和《保守国家秘密法》等法律法规。鉴于事态严重性，请求平台立即删除。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "29",
    categoryId: "10",
    content:
      "此信息包含危害国家安全的内容，可能涉及颠覆国家政权、分裂国家等严重违法行为。根据《刑法》第一百零二条至一百一十三条相关规定，要求紧急处置并配合调查。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "30",
    categoryId: "10",
    content:
      "该账号发布的内容严重违反《国家安全法》《网络安全法》等法律规定，涉嫌危害国家安全和社会稳定。请求平台依法采取紧急措施。",
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]

interface CopyTrack {
  complaintId: string
  lastCopyTime: number
}

const copyTracks: CopyTrack[] = []

export async function getCategories() {
  return categories.map((cat) => ({
    ...cat,
    count: complaints.filter((c) => c.categoryId === cat.id).length,
  }))
}

export async function getCategoryById(id: string) {
  return categories.find((cat) => cat.id === id)
}

export async function createCategory(name: string, icon: string) {
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    icon,
    createdAt: Date.now(),
  }
  categories.push(newCategory)
  return newCategory
}

export async function updateCategory(id: string, name: string, icon: string) {
  const index = categories.findIndex((cat) => cat.id === id)
  if (index === -1) return null

  categories[index] = { ...categories[index], name, icon }
  return categories[index]
}

export async function deleteCategory(id: string) {
  categories = categories.filter((cat) => cat.id !== id)
  complaints = complaints.filter((c) => c.categoryId !== id)
  return true
}

export async function getComplaintsByCategory(categoryId: string) {
  return complaints.filter((c) => c.categoryId === categoryId)
}

export async function getComplaintById(id: string) {
  return complaints.find((c) => c.id === id)
}

export async function createComplaint(categoryId: string, content: string) {
  const newComplaint: Complaint = {
    id: Date.now().toString(),
    categoryId,
    content,
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  complaints.push(newComplaint)
  return newComplaint
}

export async function updateComplaint(id: string, content: string) {
  const index = complaints.findIndex((c) => c.id === id)
  if (index === -1) return null

  complaints[index] = { ...complaints[index], content, updatedAt: Date.now() }
  return complaints[index]
}

export async function deleteComplaint(id: string) {
  complaints = complaints.filter((c) => c.id !== id)
  return true
}

export async function trackComplaintUsage(id: string) {
  const now = Date.now()
  const oneMinute = 1 * 60 * 1000

  // Find existing track for this complaint
  const existingTrack = copyTracks.find((t) => t.complaintId === id)

  if (!existingTrack || now - existingTrack.lastCopyTime > oneMinute) {
    const complaint = complaints.find((c) => c.id === id)
    if (complaint) {
      complaint.usageCount++
    }

    // Update or add track
    if (existingTrack) {
      existingTrack.lastCopyTime = now
    } else {
      copyTracks.push({ complaintId: id, lastCopyTime: now })
    }
  }

  const validTracks = copyTracks.filter((t) => now - t.lastCopyTime <= oneMinute)
  copyTracks.length = 0
  copyTracks.push(...validTracks)
}

export async function searchComplaints(query: string) {
  const lowerQuery = query.toLowerCase()
  return complaints
    .filter((c) => c.content.toLowerCase().includes(lowerQuery))
    .map((c) => ({
      ...c,
      categoryName: categories.find((cat) => cat.id === c.categoryId)?.name || "",
    }))
}

export async function exportData() {
  return {
    categories,
    complaints,
    exportedAt: Date.now(),
    version: "1.0",
  }
}

export async function importData(data: {
  categories: Category[]
  complaints: Complaint[]
}) {
  // Validate data structure
  if (!Array.isArray(data.categories) || !Array.isArray(data.complaints)) {
    throw new Error("Invalid data format")
  }

  // Replace current data
  categories = data.categories
  complaints = data.complaints

  return {
    categoriesCount: categories.length,
    complaintsCount: complaints.length,
  }
}

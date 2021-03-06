USE [OnlineEducation]
GO
/****** Object:  Table [dbo].[ChucVu]    Script Date: 5/14/2019 6:00:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChucVu](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenChucVu] [nvarchar](50) NULL,
 CONSTRAINT [PK_ChucVu] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GiangVien]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GiangVien](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTen_GV] [nvarchar](50) NULL,
	[NgaySinh] [nvarchar](10) NULL,
	[Anh] [nvarchar](200) NULL,
	[SDT] [nvarchar](15) NULL,
	[Email] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](50) NULL,
	[MoTa] [nvarchar](max) NULL,
	[SoGioGiang] [int] NULL,
	[Luong] [decimal](18, 0) NULL,
	[IDTaiKhoan] [int] NULL,
 CONSTRAINT [PK_GiangVien] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GopY]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GopY](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](50) NULL,
	[Email] [nvarchar](50) NULL,
	[ChuDe] [nvarchar](50) NULL,
	[SDT] [nvarchar](15) NULL,
	[NoiDung] [nvarchar](max) NULL,
	[NgayNhan] [nvarchar](10) NULL,
 CONSTRAINT [PK_GopY] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocVien]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocVien](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[HoTen] [nvarchar](50) NULL,
	[NgaySinh] [nvarchar](10) NULL,
	[SDT] [nvarchar](15) NULL,
	[Email] [nvarchar](50) NULL,
	[DiaChi] [nvarchar](50) NULL,
	[IDTaiKhoan] [int] NULL,
 CONSTRAINT [PK_HocVien] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HocVien_KhoaHoc]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HocVien_KhoaHoc](
	[IDKhoaHoc] [int] NOT NULL,
	[IDHocVien] [int] NOT NULL,
	[NgayDangKy] [nvarchar](10) NULL,
	[ChuyenCan] [int] NULL,
	[DiemDanhGia] [real] NULL,
	[ThanhToan] [bit] NULL,
 CONSTRAINT [PK_HocVien_KhoaHoc] PRIMARY KEY CLUSTERED 
(
	[IDKhoaHoc] ASC,
	[IDHocVien] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhoaHoc]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhoaHoc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenKhoaHoc] [nvarchar](200) NULL,
	[MoTa] [nvarchar](max) NULL,
	[Anh] [nvarchar](200) NULL,
	[HocPhi] [decimal](18, 0) NULL,
	[ThoiGianBatDau] [nvarchar](10) NULL,
	[ThoiGianKetThuc] [nvarchar](10) NULL,
	[LichHoc] [nvarchar](max) NULL,
	[TrangThai] [bit] NULL,
	[MetaTitle] [nvarchar](200) NULL,
	[IDLoaiKhoaHoc] [int] NULL,
	[IDGiangVien] [int] NULL,
 CONSTRAINT [PK_KhoaHoc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoaiKhoaHoc]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiKhoaHoc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenLoaiKhoaHoc] [nvarchar](50) NULL,
	[MoTa] [nvarchar](max) NULL,
	[MetaTitle] [nvarchar](200) NULL,
 CONSTRAINT [PK_LoaiKhoaHoc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TaiKhoan]    Script Date: 5/14/2019 6:00:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TaiKhoan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TenDangNhap] [nvarchar](50) NULL,
	[MatKhau] [nvarchar](200) NULL,
	[NgayTao] [nvarchar](10) NULL,
	[TrangThai] [bit] NULL,
	[IDChucVu] [int] NULL,
 CONSTRAINT [PK_TaiKhoan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TinTuc]    Script Date: 5/14/2019 6:00:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TinTuc](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TieuDe] [nvarchar](max) NULL,
	[TomTat] [nvarchar](max) NULL,
	[NoiDung] [nvarchar](max) NULL,
	[TrangThai] [bit] NULL,
	[MetaTitle] [nvarchar](200) NULL,
	[IDTaiKhoan] [int] NULL,
 CONSTRAINT [PK_TinTuc] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ChucVu] ON 

INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (1, N'Admin')
INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (2, N'Giảng viên')
INSERT [dbo].[ChucVu] ([ID], [TenChucVu]) VALUES (3, N'Học viên')
SET IDENTITY_INSERT [dbo].[ChucVu] OFF
SET IDENTITY_INSERT [dbo].[GiangVien] ON 

INSERT [dbo].[GiangVien] ([ID], [HoTen_GV], [NgaySinh], [Anh], [SDT], [Email], [DiaChi], [MoTa], [SoGioGiang], [Luong], [IDTaiKhoan]) VALUES (1, N'Văn Lành', N'14/12/1997', N'zed.jpg', N'0687978522', N'quocthai0099@gmail.com', N'Quãng Ngãi', N'<p><strong>Giảng vi&ecirc;n n&agrave;y rất đẹp trai</strong></p>', 2000, CAST(15000000 AS Decimal(18, 0)), 9)
INSERT [dbo].[GiangVien] ([ID], [HoTen_GV], [NgaySinh], [Anh], [SDT], [Email], [DiaChi], [MoTa], [SoGioGiang], [Luong], [IDTaiKhoan]) VALUES (2, N'Thanh Hà', N'03-06-1997', N'sep.jpg', N'0123489756', N'thanhha0099@gmail.com', N'Di Linh', N'<p><em><strong>Giảng vi&ecirc;n n&agrave;y g&aacute;y vler</strong></em></p>', 5000, CAST(600000 AS Decimal(18, 0)), 4)
INSERT [dbo].[GiangVien] ([ID], [HoTen_GV], [NgaySinh], [Anh], [SDT], [Email], [DiaChi], [MoTa], [SoGioGiang], [Luong], [IDTaiKhoan]) VALUES (2002, N'Hữu Thi', N'14/3/1997', N'zed.jpg', N'0123699945', N'huuthi@gmail.com', N'Biên Hòa', N'<p>Thi ml</p>', 1500, CAST(300000 AS Decimal(18, 0)), 3)
INSERT [dbo].[GiangVien] ([ID], [HoTen_GV], [NgaySinh], [Anh], [SDT], [Email], [DiaChi], [MoTa], [SoGioGiang], [Luong], [IDTaiKhoan]) VALUES (2003, N'Văn Luyện', N'03/07/1997', N'Otherworld Realms_ Photo.png', N'0166798987', N'vanluyen@gmail.com', N'Việt Trì', N'', 2000, CAST(35000 AS Decimal(18, 0)), 8)
INSERT [dbo].[GiangVien] ([ID], [HoTen_GV], [NgaySinh], [Anh], [SDT], [Email], [DiaChi], [MoTa], [SoGioGiang], [Luong], [IDTaiKhoan]) VALUES (3002, N'Lan Chi', N'14/12/1997', N'gritter.png', N'0349997622', N'lanchi@gmail.com', N'Đà Lạt', N'<p><em><strong>Chi dễ thương VL</strong></em></p>', 15, CAST(60000 AS Decimal(18, 0)), 12)
SET IDENTITY_INSERT [dbo].[GiangVien] OFF
SET IDENTITY_INSERT [dbo].[GopY] ON 

INSERT [dbo].[GopY] ([ID], [HoTen], [Email], [ChuDe], [SDT], [NoiDung], [NgayNhan]) VALUES (1, N'Quốc Khánh', N'khanhbuilegend@gmail.com', N'Góp ý', N'01234502197', N'Web provler', NULL)
INSERT [dbo].[GopY] ([ID], [HoTen], [Email], [ChuDe], [SDT], [NoiDung], [NgayNhan]) VALUES (3, N'Hữu Thi', N'rinnegan@gmail.com', N'Cân All', N'01234987546', N'Tao cân all', NULL)
INSERT [dbo].[GopY] ([ID], [HoTen], [Email], [ChuDe], [SDT], [NoiDung], [NgayNhan]) VALUES (4, N'Quốc Thái', N'quocthai0099@gmail.com', N'Chán quá', N'09789786356', N'Hộ cái', NULL)
INSERT [dbo].[GopY] ([ID], [HoTen], [Email], [ChuDe], [SDT], [NoiDung], [NgayNhan]) VALUES (5, N'Thanh Hà', N'thanhha@gmail.com', N'Quá buồn', N'09878941334', N'Buồn ngủ', NULL)
SET IDENTITY_INSERT [dbo].[GopY] OFF
SET IDENTITY_INSERT [dbo].[HocVien] ON 

INSERT [dbo].[HocVien] ([ID], [HoTen], [NgaySinh], [SDT], [Email], [DiaChi], [IDTaiKhoan]) VALUES (4, N'Yasuo', N'14/12/1997', N'0349997622', N'yasuo@gmail.com', N'Đường trên', 6)
INSERT [dbo].[HocVien] ([ID], [HoTen], [NgaySinh], [SDT], [Email], [DiaChi], [IDTaiKhoan]) VALUES (6, N'Zed', N'10/3/1997', N'0166997433', N'zed@gmail.com', N'Đường giữa', 7)
INSERT [dbo].[HocVien] ([ID], [HoTen], [NgaySinh], [SDT], [Email], [DiaChi], [IDTaiKhoan]) VALUES (8, N'Quốc Khánh', N'02/09/1997', N'01234502197', N'khanhbuilegend@gmail.com', N'KrongBong', 5)
INSERT [dbo].[HocVien] ([ID], [HoTen], [NgaySinh], [SDT], [Email], [DiaChi], [IDTaiKhoan]) VALUES (9, N'Lan Chi', N'11/1/1997', NULL, N'lanchi@gmail.com', NULL, 12)
SET IDENTITY_INSERT [dbo].[HocVien] OFF
SET IDENTITY_INSERT [dbo].[KhoaHoc] ON 

INSERT [dbo].[KhoaHoc] ([ID], [TenKhoaHoc], [MoTa], [Anh], [HocPhi], [ThoiGianBatDau], [ThoiGianKetThuc], [LichHoc], [TrangThai], [MetaTitle], [IDLoaiKhoaHoc], [IDGiangVien]) VALUES (1, N'HTML căn bản', N'<p><strong>Nguyễn Dương Quốc Th&aacute;i</strong></p>', N'zed.jpg', CAST(500000 AS Decimal(18, 0)), N'14/4/2019', N'20/4/2019', N'7h sáng đến 11 trưa', 0, N'html-can-ban', 1, 1)
INSERT [dbo].[KhoaHoc] ([ID], [TenKhoaHoc], [MoTa], [Anh], [HocPhi], [ThoiGianBatDau], [ThoiGianKetThuc], [LichHoc], [TrangThai], [MetaTitle], [IDLoaiKhoaHoc], [IDGiangVien]) VALUES (2, N'JavaScript căn bản', N'<p><em>Kh&oacute;a học JavaScipt căn bản</em></p>', N'yasuo.jpg', CAST(200000 AS Decimal(18, 0)), N'20/4/2019', N'26/4/2019', N'7h sáng đến 9h sáng', 1, N'javascript-can-ban', 2, 2)
SET IDENTITY_INSERT [dbo].[KhoaHoc] OFF
SET IDENTITY_INSERT [dbo].[LoaiKhoaHoc] ON 

INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (1, N'HTML', N'Khóa học HTML', N'html')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (2, N'JavaScript', N'Khóa học JavaScript', NULL)
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (3, N'CSS', N'Khóa học CSS', NULL)
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (4, N'Angular', N'Khóa học Angular', NULL)
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (5, N'React', N'Khóa học React', NULL)
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (6, N'Lập trình C++', N'Khóa học lập trình C++', N'lap-trinh-c++')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (8, N'Lập trình C#', N'Khóa học lập trình C#', N'lap-trinh-c#')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (9, N'Python', N'Khóa học lập trình Python', N'python')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (10, N'Lập trình Java', N'Khóa học lập trình Java', N'lap-trinh-java')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (11, N'Lập trình mạng', N'Khóa học lập trình mạng', N'lap-trinh-mang')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (12, N'Android', N'Khóa học lập trình Android', N'android')
INSERT [dbo].[LoaiKhoaHoc] ([ID], [TenLoaiKhoaHoc], [MoTa], [MetaTitle]) VALUES (1015, N'Demo', N'Demo', N'demo')
SET IDENTITY_INSERT [dbo].[LoaiKhoaHoc] OFF
SET IDENTITY_INSERT [dbo].[TaiKhoan] ON 

INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (2, N'quocthai', N'A4DBBBD69501FBF649FFE336AFA34F16FA3F6F668881839502E7AC2FC33410BD', N'16/04/2019', 1, 1)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (3, N'huuthi', N'13A4B8EF742DE14583C5BD55C118EA785EB1D67EEE4159FDDFB53070D9528466', N'16/04/2019', 1, 2)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (4, N'thanhha', N'02CDB0D8091D6A57CE4F63F4788149145DD11C5E332E4605DC915358C1A2DF74', N'16/04/2019', 1, 2)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (5, N'quockhanh', N'4A933CBB4D154E9AFACF7F529F1548DE09513C4227FA53063C28210435B67DAA', N'16/04/2019', 0, 3)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (6, N'yasuo', N'806B02B82BD1EAA80056891464F85AC5E9EF9DECDED42DAB28368BFD6B156BC9', N'16/04/2019', 0, 3)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (7, N'zed', N'FD07230AC4A7B71F1E6503677C74DE176A27CBC3E0FE019521FF7E5CB1F97344', N'16/04/2019', 0, 3)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (8, N'levanluyen', N'D53829AD5333B4D208EA70E9C1EEB4C10DCD2E5DF4AFC85A86F7F86ED769F0A8', N'16/04/2019', 1, 2)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (9, N'vanlanh', N'A665A45920422F9D417E4867EFDC4FB8A04A1F3FFF1FA07E998E86F7F7A27AE3', N'16/04/2019', 1, 2)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (11, N'mahoa', N'3853EF81241BBE8EFA1F3BD1AC2A306006049C26A12E9CF6F5578891ADA734A5', N'07/05/2019', 1, 1)
INSERT [dbo].[TaiKhoan] ([ID], [TenDangNhap], [MatKhau], [NgayTao], [TrangThai], [IDChucVu]) VALUES (12, N'lanchi', N'DED5F26ED7BD96A5D824EF9B47C2A617F41DF6EB7FBAC7C38507C117FA86D205', N'11/05/2019', 1, 2)
SET IDENTITY_INSERT [dbo].[TaiKhoan] OFF
SET IDENTITY_INSERT [dbo].[TinTuc] ON 

INSERT [dbo].[TinTuc] ([ID], [TieuDe], [TomTat], [NoiDung], [TrangThai], [MetaTitle], [IDTaiKhoan]) VALUES (1, N'Học JavaScript có ích lợi gì', N'Học JavaScipt vui vl', N'JS hay vler', 1, N'hoc-javascript-co-ich-loi-gi', 2)
INSERT [dbo].[TinTuc] ([ID], [TieuDe], [TomTat], [NoiDung], [TrangThai], [MetaTitle], [IDTaiKhoan]) VALUES (2, N'Học HTML có lợi hay hại', N'Học HTML', N'HTML dễ vler', 0, N'hoc-html-co-loi-hay-hai', 4)
SET IDENTITY_INSERT [dbo].[TinTuc] OFF

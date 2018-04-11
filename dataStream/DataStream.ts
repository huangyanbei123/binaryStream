import { DataTypeEnum } from '../model/DataTypeEnum';
import { StringBuffer } from './StringBuffer';
import { DataViewer } from './DataViewer';


export class DataStream extends DataViewer {
   /** 位置 */
   public position: number;
   /** 内存 */
   protected _memory: ArrayBuffer;
   /** 长度 */
   public length: number;

   /**
    * 构造处理。
    *
    * @param data 数据
    */
   public constructor(data?: any, offset?: number, length?: number, endianCd: boolean = false) {
      super(endianCd);
      // 设置属性
      this.position = 0;
      if (data) {
         this.link(data, offset, length);
      }
   }

   /**
    * 关联数据。
    *
    * @param data 数据
    * @param offset 位置
    * @param length 长度
    */
   public link(data: any, offset?: number, length?: number) {
      // 获得缓冲
      var buffer = null;
      var dataClass = data.constructor;
      if (dataClass == Array) {
         var inputData = new Uint8Array(data);
         buffer = inputData.buffer;
      } else if (dataClass == Uint8Array) {
         buffer = data.buffer;
      } else if (dataClass == ArrayBuffer) {
         buffer = data;
      } else {
      }
      // 设置视图
      if (offset == null) {
         offset = undefined;
      }
      if (length == null) {
         length = undefined;
      }
      this._memory = buffer;
      this.length = length;
      this._viewer = new DataView(buffer, offset, length);
      this.position = 0;
   }

   /**
    * 测试字符串。
    *
    * @return 字符串
    */
   public testString(): string {
      var position = this.position;
      var length = this._viewer.getUint16(position, this.endianCd);
      position += 2;
      var result = new StringBuffer();
      for (var i = 0; i < length; i++) {
         var value = this._viewer.getUint16(position, this.endianCd);
         position += 2;
         result.append(String.fromCharCode(value));
      }
      return result.flush();
   }

   /**
    * 读取布尔值。
    *
    * @return 布尔值
    */
   public readBoolean(): boolean {
      var value = this._viewer.getInt8(this.position);
      this.position++;
      return value > 0;
   }

   /**
    * 读取有8位有符号整数。
    *
    * @return 8位有符号整数
    */
   public readInt8(): number {
      var value = this._viewer.getInt8(this.position);
      this.position++;
      return value;
   }

   /**
    * 读取有16位有符号整数。
    *
    * @return 16位有符号整数
    */
   public readInt16(): number {
      var value = this._viewer.getInt16(this.position, this.endianCd);
      this.position += 2;
      return value;
   }

   /**
    * 读取有32位有符号整数。
    *
    * @return 32位有符号整数
    */
   public readInt32(): number {
      var value = this._viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   /**
    * 读取有64位有符号整数。
    *
    * @return 64位有符号整数
    */
   public readInt64(): number {
      var value1 = this._viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      var value2 = this._viewer.getInt32(this.position, this.endianCd);
      this.position += 4;
      return value2 << 32 + value1;
   }

   /**
    * 读取有8位无符号整数。
    *
    * @return 8位无符号整数
    */
   public readUint8(): number {
      var value = this._viewer.getUint8(this.position);
      this.position += 1;
      return value;
   }

   /**
    * 读取有16位无符号整数。
    *
    * @return 16位无符号整数
    */
   public readUint16(): number {
      var value = this._viewer.getUint16(this.position, this.endianCd);
      this.position += 2;
      return value;
   }

   /**
    * 读取有32位无符号整数。
    *
    * @return 32位无符号整数
    */
   public readUint32(): number {
      var value = this._viewer.getUint32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   /**
    * 读取有64位无符号整数。
    *
    * @return 64位无符号整数
    */
   public readUint64(): number {
      var endianCd = this.endianCd;
      var value1 = this._viewer.getUint32(this.position, endianCd);
      this.position += 4;
      var value2 = this._viewer.getUint32(this.position, endianCd);
      this.position += 4;
      var value = 0;
      if (endianCd) {
         value = (value2 << 32) + value1;
      } else {
         value = (value1 << 32) + value2;
      }
      return value;
   }

   /**
    * 读取浮点数。
    *
    * @return 浮点数
    */
   public readFloat(): number {
      var value = this._viewer.getFloat32(this.position, this.endianCd);
      this.position += 4;
      return value;
   }

   /**
    * 读取双精度浮点数。
    *
    * @return 双精度浮点数
    */
   public readDouble(): number {
      var value = this._viewer.getFloat64(this.position, this.endianCd);
      this.position += 8;
      return value;
   }

   /**
    * 读取字符串。
    *
    * @return 字符串
    */
   public readString(): string {
      var viewer = this._viewer;
      var endianCd = this.endianCd;
      var position = this.position;
      var length = viewer.getUint16(position, endianCd);
      position += 2;
      var value = new StringBuffer();
      for (var i = 0; i < length; i++) {
         var character = viewer.getUint16(position, endianCd);
         value.append(String.fromCharCode(character));
         position += 2;
      }
      this.position = position;
      return value.flush();
   }

   /**
    * 读取字节数组。
    *
    * @param data 数组
    * @param offset 开始位置
    * @param length 长度
    * @return 读取长度
    */
   public readBytes(data: any, : number): number {
      var viewer = this._viewer;
      var position = this.position;
      var endianCd = this.endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array: any = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getFloat64(position, endianCd);
            position += 8;
         }
         this.position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array: any = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint32(position, endianCd);
            position += 4;
         }
         this.position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array: any = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            array[i] = viewer.getUint16(position, endianCd);
            position += 2;
         }
         this.position = position;
         return;
      }
      // 逐字节复制
      var array: any = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         array[i] = viewer.getUint8(position++);
      }
      this.position = position;
   }

   /**
    * 读取类型数据。
    *
    * @param dataCd 数据类型
    * @return 数据
    */
   public readData(dataCd): any {
      switch (dataCd) {
         case DataTypeEnum.Int8:
            return this.readInt8();
         case DataTypeEnum.Int16:
            return this.readInt16();
         case DataTypeEnum.Int32:
            return this.readInt32();
         case DataTypeEnum.Int64:
            return this.readInt64();
         case DataTypeEnum.Uint8:
            return this.readUint8();
         case DataTypeEnum.Uint16:
            return this.readUint16();
         case DataTypeEnum.Uint32:
            return this.readUint32();
         case DataTypeEnum.Uint64:
            return this.readUint64();
         case DataTypeEnum.Float32:
            return this.readFloat();
         case DataTypeEnum.Float64:
            return this.readDouble();
         case DataTypeEnum.String:
            return this.readString();
      }
   }

   /**
    * 写入布尔值。
    *
    * @param value 布尔值
    */
   public writeBoolean(value: boolean) {
      this._viewer.setInt8(this.position, value ? 1 : 0);
      this.position++;
   }

   /**
    * 写入8位有符号整数。
    *
    * @param value 8位有符号整数
    */
   public writeInt8(value: number) {
      this._viewer.setInt8(this.position, value);
      this.position++;
   }

   /**
    * 写入16位有符号整数。
    *
    * @param value 16位有符号整数
    */
   public writeInt16(value: number) {
      this._viewer.setInt16(this.position, value, this.endianCd);
      this.position += 2;
   }

   /**
    * 写入32位有符号整数。
    *
    * @param value 32位有符号整数
    */
   public writeInt32(value: number) {
      this._viewer.setInt32(this.position, value, this.endianCd);
      this.position += 4;
   }

   /**
    * 写入64位有符号整数。
    *
    * @param value 64位有符号整数
    */
   public writeInt64(value: number) {
      this._viewer.setInt32(this.position, value, this.endianCd);
      this._viewer.setInt32(this.position, value >> 32, this.endianCd);
      this.position += 8;
   }

   /**
    * 写入8位无符号整数。
    *
    * @param value 8位无符号整数
    */
   public writeUint8(value: number) {
      this._viewer.setUint8(this.position, value);
      this.position += 1;
   }

   /**
    * 写入16位无符号整数。
    *
    * @param value 16位无符号整数
    */
   public writeUint16(value: number) {
      this._viewer.setUint16(this.position, value, this.endianCd);
      this.position += 2;
   }

   /**
    * 写入32位无符号整数。
    *
    * @param value 32位无符号整数
    */
   public writeUint32(value: number) {
      this._viewer.setUint32(this.position, value, this.endianCd);
      this.position += 4;
   }

   /**
    * 写入64位无符号整数。
    *
    * @param value 64位无符号整数
    */
   public writeUint64(value: number) {
      this._viewer.setUint32(this.position, value, this.endianCd);
      this._viewer.setUint32(this.position, value >> 32, this.endianCd);
      this.position += 8;
   }

   /**
    * 写入浮点数。
    *
    * @param value 浮点数
    */
   public writeFloat(value: number) {
      this._viewer.setFloat32(this.position, value, this.endianCd);
      this.position += 4;
   }

   /**
    * 写入双精度浮点数。
    *
    * @param value 双精度浮点数
    */
   public writeDouble(value: number) {
      this._viewer.setFloat64(this.position, value, this.endianCd);
      this.position += 8;
   }

   /**
    * 写入字符串。
    *
    * @param value 字符串
    */
   public writeString(value: string) {
      var viewer: DataView = this._viewer;
      var length = value.length;
      var endianCd = this.endianCd;
      var position = this.position;
      viewer.setUint16(position, length, endianCd);
      position += 2;
      for (var i = 0; i < length; i++) {
         viewer.setUint16(position, value.charCodeAt(i), endianCd);
         position += 2;
      }
      this.position = position;
   }

   /**
    * 写入字节数组。
    *
    * @param data 数组
    * @param offset 开始位置
    * @param length 长度
    * @return 读取长度
    */
   public writeBytes(data: any, length: number) {
      var viewer = this._viewer;
      // 检查长度
      if (length <= 0) {
         return;
      }
      var position = this.position;
      var endianCd = this.endianCd;
      // 8字节复制
      if (length % 8 == 0) {
         var array: any = new Float64Array(data);
         var count = length >> 3;
         for (var i = 0; i < count; i++) {
            viewer.setFloat64(position, array[i], endianCd);
            position += 8;
         }
         this.position = position;
         return;
      }
      // 4字节复制
      if (length % 4 == 0) {
         var array: any = new Uint32Array(data);
         var count = length >> 2;
         for (var i = 0; i < count; i++) {
            viewer.setUint32(position, array[i], endianCd);
            position += 4;
         }
         this.position = position;
         return;
      }
      // 2字节复制
      if (length % 2 == 0) {
         var array: any = new Uint16Array(data);
         var count = length >> 1;
         for (var i = 0; i < count; i++) {
            viewer.setUint16(position, array[i], endianCd);
            position += 2;
         }
         this.position = position;
         return;
      }
      // 逐字节复制
      var array: any = new Uint8Array(data);
      for (var i = 0; i < length; i++) {
         viewer.setUint8(position++, array[i]);
      }
      this.position = position;
   }

   /**
    * 写入类型数据。
    *
    * @param dataCd 数据类型
    * @param value 数据
    */
   public writeData(dataCd: DataTypeEnum, value: any) {
      switch (dataCd) {
         case DataTypeEnum.Int8:
            return this.writeInt8(value);
         case DataTypeEnum.Int16:
            return this.writeInt16(value);
         case DataTypeEnum.Int32:
            return this.writeInt32(value);
         case DataTypeEnum.Int64:
            return this.writeInt64(value);
         case DataTypeEnum.Uint8:
            return this.writeUint8(value);
         case DataTypeEnum.Uint16:
            return this.writeUint16(value);
         case DataTypeEnum.Uint32:
            return this.writeUint32(value);
         case DataTypeEnum.Uint64:
            return this.writeUint64(value);
         case DataTypeEnum.Float32:
            return this.writeFloat(value);
         case DataTypeEnum.Float64:
            return this.writeDouble(value);
         case DataTypeEnum.String:
            return this.writeString(value);
      }
   }
}

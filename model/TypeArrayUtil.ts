import { DataTypeEnum } from './DataTypeEnum';


export class TypeArrayUtil {
   /** 3元素浮点数 */
   protected static _float3;
   /** 4元素浮点数 */
   protected static _float4;
   /** 数据集合 */
   protected static _data = new Object();

   /**
    * 获得3元素浮点数。
    *
    * @return Float32Array 浮点数
    */
   public static float3() {
      var value = this._float3;
      if (value == null) {
         value = this._float3 = new Float32Array(3);
      }
      return value;
   }

   /**
    * 获得4元素浮点数。
    *
    * @return Float32Array 浮点数
    */
   public static float4() {
      var value = this._float4;
      if (value == null) {
         value = this._float4 = new Float32Array(4);
      }
      return value;
   }

   /**
    * 创建定长的数组。
    *
    * @param typeCd 数据类型
    * @param length 数据长度
    * @return 数组
    */
   public static createArray(typeCd, length: number): any {
      switch (typeCd) {
         case DataTypeEnum.Boolean:
         case DataTypeEnum.Int8:
            return new Int8Array(length);
         case DataTypeEnum.Int16:
            return new Int16Array(length);
         case DataTypeEnum.Int32:
            return new Int32Array(length);
         case DataTypeEnum.Uint8:
            return new Uint8Array(length);
         case DataTypeEnum.Uint16:
            return new Uint16Array(length);
         case DataTypeEnum.Uint32:
            return new Uint32Array(length);
         case DataTypeEnum.Float32:
            return new Float32Array(length);
         case DataTypeEnum.Float64:
            return new Float64Array(length);
      }
   }

   /**
    * 获得唯一的临时数组。
    *
    * @param typeCd 数据类型
    * @param length 数据长度
    * @return 数组
    */
   public static findTemp(typeCd, length) {
      var data = this._data;
      // 获得类型集合
      var arrays = data[typeCd];
      if (arrays == null) {
         arrays = data[typeCd] = new Object();
      }
      // 获得类型长度
      var array = arrays[length];
      if (array == null) {
         array = arrays[length] = this.createArray(typeCd, length);
      }
      return array;
   }
}
